<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Http\Services\UserService;

class UserController extends Controller
{
    public $user_service;

    public function __construct() {
        parent::__construct();  

        $this->user_service = new UserService();
    }

    public function getList(Request $request){
        try {
            $data = $this->user_service->getUsers($request);
            return $this->responseSuccess($data);
        } catch (Exception $e) {
            return $this->handleException($e);
        }
    }

}
