<?php

namespace App\Http\Controllers;
use Response;
use Exception;

abstract class Controller
{
    public $response;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->response = response();
    }

    public function responseSuccess($data = [], $message = 'success', $extends = null)
    {
        $code = 200;
        $res = [
            'code' => 200,
            'success' => true,
            'message' => $message,
            'data' => $data
        ];
        if ($extends) {
            $res = [...$res, ...$extends];
        }
        return Response::json($res, $code);
    }

    public function responseError($message, $code = 400)
    {
        if ($code < 200 || $code > 600) {
            $code = 500;
        }

        $res = [
            'code' => $code,
            'success' => false,
            'message' => $message,
        ];
        return Response::json($res, $code);
    }

    public function handleException(Exception $e)
    {
        $message = $e->getMessage();
        $code = $e->getCode();
        return $this->responseError($message, $code);
    }

    public function handleValidationException($data)
    {
        return $this->responseError($data, 422);
    }
}
