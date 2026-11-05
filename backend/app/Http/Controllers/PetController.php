<?php

namespace App\Http\Controllers;

use App\Models\Pet;
use Illuminate\Http\Request;

class PetController extends Controller
{
    private function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'owner' => 'required|string|max:255',
            'type' => 'required|in:Dog,Cat',
            'breed' => 'required|string|max:255',
            'age' => 'required|integer|min:0',
            'status' => 'required|in:Active,Inactive',
        ];
    }

    public function index()
    {
        return Pet::latest()->get();
    }

    public function store(Request $request)
    {
        $pet = Pet::create($request->validate($this->rules()));

        return response()->json($pet, 201);
    }

    public function show(Pet $pet)
    {
        return $pet;
    }

    public function update(Request $request, Pet $pet)
    {
        $pet->update($request->validate($this->rules()));

        return $pet;
    }

    public function destroy(Pet $pet)
    {
        $pet->delete();

        return response()->noContent();
    }
}