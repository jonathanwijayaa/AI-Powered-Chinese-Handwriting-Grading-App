import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export async function POST(request: Request) {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { error: 'Environment variables Supabase belum diset.' },
        { status: 500 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    const formData = await request.formData()
    const file = formData.get('file') as File | null
    const studentId = (formData.get('studentId') as string) || 'student_lucas_p2'

    if (!file) {
      return NextResponse.json({ error: 'File gambar tidak ditemukan' }, { status: 400 })
    }

    const fileExt = file.name.split('.').pop() || 'jpg'
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(2, 9)}.${fileExt}`

    const arrayBuffer = await file.arrayBuffer()
    const fileBuffer = Buffer.from(arrayBuffer)

    // Upload ke bucket worksheets
    const { error: storageError } = await supabase.storage
      .from('worksheets')
      .upload(fileName, fileBuffer, {
        contentType: file.type || 'image/jpeg',
        upsert: true,
      })

    if (storageError) {
      console.error('STORAGE ERROR HP:', storageError)
      return NextResponse.json(
        { error: `Storage Error: ${storageError.message}` },
        { status: 500 }
      )
    }

    const { data: publicUrlData } = supabase.storage
      .from('worksheets')
      .getPublicUrl(fileName)

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
      console.error('DATABASE ERROR HP:', dbError)
      return NextResponse.json(
        { error: `Database Error: ${dbError.message}` },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        message: 'Worksheet uploaded successfully',
        submissionId: submission.id,
        imageUrl: submission.image_url,
      },
      {
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        },
      }
    )
  } catch (err: any) {
    console.error('API CRASH LOG:', err)
    return NextResponse.json(
      { error: err.message || 'Internal server error' },
      { status: 500 }
    )
  }
}