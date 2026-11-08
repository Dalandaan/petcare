<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function index()
    {
        return Service::orderBy('id')->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'required|numeric|min:0',
            'duration' => 'nullable|integer|min:0',
            'status' => 'nullable|string|max:50',
        ]);

        $data['description'] = $data['description'] ?? '';
        $data['duration'] = $data['duration'] ?? 0;
        $data['status'] = $data['status'] ?? 'Active';

        $service = Service::create($data);

        return response()->json($service, 201);
    }

    public function show(Service $service)
    {
        return $service;
    }

    public function update(Request $request, Service $service)
    {
        $data = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'description' => 'nullable|string',
            'price' => 'sometimes|required|numeric|min:0',
            'duration' => 'nullable|integer|min:0',
            'status' => 'nullable|string|max:50',
        ]);

        if (array_key_exists('description', $data)) {
            $data['description'] = $data['description'] ?? '';
        }
        if (array_key_exists('duration', $data)) {
            $data['duration'] = $data['duration'] ?? 0;
        }
        if (array_key_exists('status', $data)) {
            $data['status'] = $data['status'] ?? 'Active';
        }

        $service->update($data);

        return $service;
    }

    public function destroy(Service $service)
    {
        $service->delete();

        return response()->noContent();
    }
}