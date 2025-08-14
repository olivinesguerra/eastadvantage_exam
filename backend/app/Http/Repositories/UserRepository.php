<?php

namespace App\Http\Repositories;

use App\Models\User;

class UserRepository
{
    
    public function get_user_by_email($email) 
    {
        $user = User::where("email", $email)->first();
        return $user;
    }

    public function create_user($params) 
    {
        return User::create($params);
    }

    public function get_users($query, $page, $limit) {
        // return User::where('email', "=" ,$email)->first();
        return null;
    }
}
