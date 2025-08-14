<?php

namespace App\Http\Validator;
use Exception;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Models\User;

class AuthValidator 
{
    public function register($request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|min:1',
            'name' => 'required|string|min:1',
            'role' => ['required', Rule::in(User::$types)],
        ]);

        if ($validator->fails()) {
            return $validator->errors();
        }

        return null;
    }

}