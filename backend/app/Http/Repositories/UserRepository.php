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
        return User::create([
            "role" => $params->role,
            "email" => $params->email,
            "name" => $params->name,
        ]);
    }

    public function get_users($params, $page, $limit) {
        $users = User::select('*');

        if ($params->has("role")) {
            var_dump($params->has("role"));
             $users->where('role','=',$params->input('role'));
        }
        $users->offset((int)$page*(int)$limit);
        $users->take($limit);
        return $users->get();
    }
}
