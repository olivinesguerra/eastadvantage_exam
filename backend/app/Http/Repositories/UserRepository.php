<?php

namespace App\Http\Repositories;

use App\Models\User;

class UserRepository
{
    
    public function get_user_by_email_and_role($email, $role) 
    {
        $user = User::where("email", $email)->whereJsonContains("role", $role)->first();
        return $user;
    }

    public function create_user($params) 
    {
        return User::create([
            "role" => [$params->role],
            "email" => $params->email,
            "name" => $params->name,
        ]);
    }

    public function get_users($params, $page, $limit) {
        $users = User::select('*');

        if ($params->has("role")) {
             $users->whereJsonContains('role','in',$params->input('role'));
        }
        $users->offset((int)$page*(int)$limit);
        $users->take($limit);
        return $users->get();
    }
}
