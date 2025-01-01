import { NextResponse } from 'next/server';
import prisma from '@/lib/db'; // Assuming Prisma is initialized here
import bcrypt from "bcrypt";
import { z } from 'zod';

const signUpSchema = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    username: z.string().min(1, { message: 'Username is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' }),
    profileImage: z.string().url().optional(),
    coverImage: z.string().url().optional(),
})

export async function GET(request: Request) {
    return NextResponse.json(request);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    const validatedData = signUpSchema.safeParse(body);

    if (!validatedData.success) {
      // Return a 400 response with the Zod validation errors
      return NextResponse.json({
        error: validatedData.error.errors[0].message, // This will provide detailed validation issues
      }, { status: 400 });
    }
    const { name, username, email, password, profileImage, coverImage } = validatedData.data;


    // Check if the email is already taken
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUserByEmail) {
      return NextResponse.json({ error: 'Email already taken' }, { status: 400 });
    }

    // Check if the username is already taken
    const existingUserByUsername = await prisma.user.findUnique({
      where: { username },
    });

    if (existingUserByUsername) {
      return NextResponse.json({ error: 'Username already taken' }, { status: 400 });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const newUser = await prisma.user.create({
      data: {
        name,
        username,
        email,
        password: hashedPassword,
        profileImage: profileImage || null,
        coverImage: coverImage || null,
        createdAt: new Date(),
      },
    });

    // Respond with success and the newly created user data (excluding password)
    return NextResponse.json({
      message: 'User created successfully',
      user: {
        id: newUser.id,
        name: newUser.name,
        username: newUser.username,
        email: newUser.email,
        profileImage: newUser.profileImage,
        coverImage: newUser.coverImage,
        createdAt: newUser.createdAt,
      },
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
