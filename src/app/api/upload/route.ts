import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { evaluateWorksheetWithGemini, EXPECTED_WORDS } from '@/lib/ai-pipeline'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Supabase environment variables missing.' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseKey)
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const studentId = (formData.get('studentId') as string) || 'student_lucas_p2'

    if (!file) {
      return NextResponse.json({ error: 'No image file provided' }, { status: 400 })
    }

    const fileExt = file.name.split('.').pop() || 'jpg'
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`
    const arrayBuffer = await file.arrayBuffer()
    const fileBuffer = Buffer.from(arrayBuffer)
    const mimeType = file.type || 'image/jpeg'

    // 1. Upload ke Supabase Storage
    const { error: storageError } = await supabase.storage
      .from('worksheets')
      .upload(fileName, fileBuffer, {
        contentType: mimeType,
        upsert: true,
      })

    if (storageError) {
      return NextResponse.json(
        { error: `Storage Error: ${storageError.message}` },
        { status: 500 }
      )
    }

    const { data: publicUrlData } = supabase.storage
      .from('worksheets')
      .getPublicUrl(fileName)

    const imageUrl = publicUrlData.publicUrl

    // 2. Simpan Submission Record awal (Status: Pending)
    const { data: submission, error: dbError } = await supabase
      .from('submissions')
      .insert([
        {
          student_id: studentId,
          image_url: imageUrl,
          status: 'pending',
          max_score: EXPECTED_WORDS.length,
        },
      ])
      .select()
      .single()

    if (dbError) {
      return NextResponse.json(
        { error: `Database Error: ${dbError.message}` },
        { status: 500 }
      )
    }

    // 3. Jalankan AI Pipeline (Panggilan ke Modul Terpisah)
    const aiEvaluation = await evaluateWorksheetWithGemini(fileBuffer, mimeType)

    // 4. Catat detail tiap karakter di tabel character_results
    const charRecords = aiEvaluation.results.map((item) => ({
      submission_id: submission.id,
      word: item.word,
      is_correct: item.is_correct,
      feedback: item.feedback || null,
    }))

    await supabase.from('character_results').insert(charRecords)

    // 5. Update Submission Record menjadi Completed
    const { data: updatedSubmissions, error: updateError } = await supabase
      .from('submissions')
      .update({
        total_score: aiEvaluation.correctCount,
        percentage: aiEvaluation.percentage,
        status: 'completed',
      })
      .eq('id', submission.id)
      .select()

    if (updateError) {
      return NextResponse.json(
        { error: `Submission Update Error: ${updateError.message}` },
        { status: 500 }
      )
    }

    const updatedSubmission = updatedSubmissions?.[0] || submission

    return NextResponse.json({
      message: 'Worksheet evaluated successfully',
      submission: updatedSubmission,
      results: aiEvaluation.results,
    })
  } catch (err: any) {
    console.error('SERVER UPLOAD ROUTE ERROR:', err)
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    )
  }
}