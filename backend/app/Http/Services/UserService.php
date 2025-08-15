<?php

namespace App\Http\Services;

use Illuminate\Support\Facades\DB;
use Exception;
use Illuminate\Http\Request;
use App\Http\Repositories\UserRepository;

class UserService 
{
    private $user_repository;

    public function __construct() {
        $this->user_repository = new UserRepository();
    }

    public function register(Request $request) {
        try {
            DB::beginTransaction();
            $user = $this->user_repository->get_user_by_email_and_role($request["email"], $request["role"]);

            if (!is_null($user)) {
                throw  new  Exception("User already exist", 422);
            }

            $user = $this->user_repository->create_user($request);

            DB::commit();

            return $user;
        }catch(Exception $e){
            DB::rollBack();
            throw $e;
        }
    }

    public function getUsers(Request $request) {
        $page = 0;
        $limit = 50;

        if ($request->has("page")) {
            $page = (int)$request->page*(int)$request->limit;
        } 

        if ($request->has("limit")) {
            $limit = (int)$request->limit;
        }

        $users = $this->user_repository->get_users($request, $page, $limit);
        return $users;
    }

    public function getUser($id) {
        $id = $this->user_repository->get_user_by_id($id);
        return $id;
    }
}
