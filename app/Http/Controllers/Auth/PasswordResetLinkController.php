<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class PasswordResetLinkController extends Controller
{
    /**
     * Show the password reset link request page.
     */
    public function create(Request $request): Response
    {
        return Inertia::render('auth/forgot-password', [
            'status' => $request->session()->get('status'),
        ]);
    }

    /**
     * Handle an incoming password reset request for parents.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'email' => 'required|email',
            'dob' => 'required|date',
            'password' => 'required|string|min:6|confirmed',
        ]);

        $user = User::where('email', $request->email)->where('role', 'parent')->first();

        if (!$user) {
            throw ValidationException::withMessages([
                'email' => __('Email tidak terdaftar atau bukan akun orang tua.'),
            ]);
        }

        $studentMatches = $user->children()->where('date_of_birth', $request->dob)->exists();

        if (!$studentMatches) {
            throw ValidationException::withMessages([
                'dob' => __('Tanggal lahir siswa tidak sesuai.'),
            ]);
        }

        $user->forceFill([
            'password' => Hash::make($request->password),
        ])->save();

        return redirect()->route('login')->with('status', __('Kata sandi berhasil diatur ulang. Silakan login.'));
    }
}
