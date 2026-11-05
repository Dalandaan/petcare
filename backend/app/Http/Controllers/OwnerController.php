<?php

namespace App\Http\Controllers;

use App\Models\Owner;
use Illuminate\Http\Request;

class OwnerController extends Controller
{
    public function index()
    {
        return Owner::latest()->get();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'    => 'required|string|max:255',
            'phone'   => 'nullable|string|max:50',
            'email'   => 'nullable|email|max:255',
            'address' => 'nullable|string|max:255',
            'status'  => 'nullable|in:Active,Inactive',
        ]);

        return response()->json(Owner::create($data), 201);
    }

    public function show(Owner $owner)
    {
        return $owner;
    }

    public function update(Request $request, Owner $owner)
    {
        $data = $request->validate([
            'name'    => 'sometimes|required|string|max:255',
            'phone'   => 'nullable|string|max:50',
            'email'   => 'nullable|email|max:255',
            'address' => 'nullable|string|max:255',
            'status'  => 'nullable|in:Active,Inactive',
        ]);

        $owner->update($data);
        return $owner;
    }

    public function destroy(Owner $owner)
    {
        $owner->delete();
        return response()->noContent();
    }
}