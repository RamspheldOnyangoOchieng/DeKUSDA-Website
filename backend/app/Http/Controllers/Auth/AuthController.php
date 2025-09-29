<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        if (!Auth::attempt($request->only('email', 'password'))) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $user = Auth::user();
        $role = $user->roles->first() ? $user->roles->first()->name : null;

        return response()->json([
            'success' => true,
            'data' => [
                'token' => $user->createToken('auth-token')->plainTextToken,
                'user' => $user,
                'role' => $role
            ]
        ]);
    }

    public function leaderLogin(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
            'department' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        // Attempt authentication
        $credentials = $request->only('email', 'password');
        
        if (!Auth::attempt($credentials)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials. Please check your email and password.'
            ], 401);
        }

        $user = Auth::user();
        
        // Check if user has appropriate role/department access
        $department = $request->department;
        $allowedDepartments = [
            'communication', 'youth', 'music', 'pastoral', 
            'health', 'education', 'finance', 'prayer'
        ];
        
        if (!in_array($department, $allowedDepartments)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid department selected.'
            ], 400);
        }

        // For now, we'll allow access if credentials are correct
        // In production, you might want to check user roles/departments
        $role = $user->roles->first() ? $user->roles->first()->name : 'staff_admin';

        return response()->json([
            'success' => true,
            'message' => 'Login successful',
            'data' => [
                'token' => $user->createToken('leader-auth-token')->plainTextToken,
                'user' => [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'role' => $role,
                    'department' => $department
                ],
                'department' => $department
            ]
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Successfully logged out'
        ]);
    }

    public function user(Request $request)
    {
        $user = $request->user();
        $role = $user->roles->first() ? $user->roles->first()->name : null;

        return response()->json([
            'success' => true,
            'data' => [
                'user' => $user,
                'role' => $role
            ]
        ]);
    }
}
