import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const studentId = (formData.get('studentId') as string) || 'student_lucas_p2'

    if (!file) {
      return NextResponse.json(
        { error: 'No image file provided' },
        { status: 400 }
      )
    }

    // 1. Generate unique file path
    const fileExt = file.name.split('.').pop() || 'jpg'
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`
    const filePath = `scans/${fileName}`

    // 2. Upload gambar ke Storage
    const arrayBuffer = await file.arrayBuffer()
    const fileBuffer = Buffer.from(arrayBuffer)

    const { error: storageError } = await supabase.storage
      .from('worksheets')
      .upload(filePath, fileBuffer, {
        contentType: file.type || 'image/jpeg',
        upsert: false,
      })

    if (storageError) {
      console.error('FAILED AT STORAGE UPLOAD:', storageError)
      return NextResponse.json(
        { error: `Storage Error: ${storageError.message}` },
        { status: 500 }
      )
    }

    // 3. Dapatkan Public URL
    const { data: publicUrlData } = supabase.storage
      .from('worksheets')
      .getPublicUrl(filePath)

    const imageUrl = publicUrlData.publicUrl

    // 4. Simpan Record ke Database
    const { data: submission, error: dbError } = await supabase
      .from('submissions')
      .insert([
        {
          student_id: studentId,
          image_url: imageUrl,
          total_score: 0,
          status: 'pending',
        },
      ])
      .select()
      .single()

    if (dbError) {
      console.error('FAILED AT DATABASE INSERT:', dbError)
      return NextResponse.json(
        { error: `Database Error: ${dbError.message}` },
        { status: 500 }
      )
    }

    return NextResponse.json({
      message: 'Worksheet uploaded successfully',
      submissionId: submission.id,
      imageUrl: submission.image_url,
    })
  } catch (err: any) {
    console.error('Server Upload API Crash:', err)
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    )
  }
}