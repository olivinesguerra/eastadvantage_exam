<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Http\Validator\AuthValidator; 
use App\Http\Services\UserService;

class AuthController extends Controller
{
    public $auth_validator;
    public $user_service;

    public function __construct() {
        parent::__construct();  
        
        $this->auth_validator = new AuthValidator();
        $this->user_service = new UserService();
    }

    public function register(Request $request){
        try {
            $err =$this->auth_validator->register($request);

            if (!is_null($err)) {
                return$this->handleValidationException($err);
            }

            $this->user_service->register($request);
            return $this->responseSuccess();
        } catch (Exception $e) {
            return $this->handleException($e);
        }
    }
}
