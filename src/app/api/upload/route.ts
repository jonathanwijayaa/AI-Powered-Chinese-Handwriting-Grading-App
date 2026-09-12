import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

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

    const fileExt = file.name.split('.').pop() || 'jpg'
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`
    const filePath = `scans/${fileName}`

    const fileBuffer = await file.arrayBuffer()
    const { data: storageData, error: storageError } = await supabase.storage
      .from('worksheets')
      .upload(filePath, fileBuffer, {
        contentType: file.type || 'image/jpeg',
        upsert: false,
      })

    if (storageError) {
      console.error('Storage Upload Error:', storageError)
      return NextResponse.json({ error: storageError.message }, { status: 500 })
    }

    const { data: publicUrlData } = supabase.storage
      .from('worksheets')
      .getPublicUrl(filePath)

    const imageUrl = publicUrlData.publicUrl

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
      console.error('Database Insert Error:', dbError)
      return NextResponse.json({ error: dbError.message }, { status: 500 })
    }

    return NextResponse.json({
      message: 'Worksheet uploaded successfully',
      submissionId: submission.id,
      imageUrl: submission.image_url,
    })
  } catch (err: any) {
    console.error('Server Upload API Error:', err)
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    )
  }
}