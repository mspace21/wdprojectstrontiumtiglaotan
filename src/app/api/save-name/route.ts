import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const { name } = await request.json();

    const filePath = path.join(process.cwd(), 'data', 'name.json');

    // Prepare data to write
    const data = { name };

    // Save the JSON
    await writeFile(filePath, JSON.stringify(data, null, 2));

    return NextResponse.json({ success: true, message: 'Name saved.' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Error saving name.', error }, { status: 500 });
  }
}