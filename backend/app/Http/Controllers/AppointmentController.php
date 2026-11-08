<?php

namespace App\Http\Controllers;

use App\Models\Appointment;
use Illuminate\Http\Request;

class AppointmentController extends Controller
{
    private function format(Appointment $a): array
    {
        return [
            'id' => $a->id,
            'date' => $a->date->format('Y-m-d'),
            'petName' => $a->pet?->name ?? '',
            'owner' => $a->owner?->name ?? '',
            'service' => $a->service?->name ?? '',
            'status' => $a->status,
            'pet_id' => $a->pet_id,
            'owner_id' => $a->owner_id,
            'service_id' => $a->service_id,
        ];
    }

    public function index()
    {
        return Appointment::with(['pet', 'owner', 'service'])
            ->orderBy('date')
            ->orderBy('id')
            ->get()
            ->map(fn ($a) => $this->format($a))
            ->values();
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'date' => 'required|date',
            'pet_id' => 'required|exists:pets,id',
            'owner_id' => 'required|exists:owners,id',
            'service_id' => 'required|exists:services,id',
            'status' => 'nullable|in:Pending,In Progress,Completed',
        ]);

        $data['status'] = $data['status'] ?? 'Pending';

        $appointment = Appointment::create($data)->load(['pet', 'owner', 'service']);

        return response()->json($this->format($appointment), 201);
    }

    public function show(Appointment $appointment)
    {
        return $this->format($appointment->load(['pet', 'owner', 'service']));
    }

    public function update(Request $request, Appointment $appointment)
    {
        $data = $request->validate([
            'date' => 'sometimes|required|date',
            'pet_id' => 'sometimes|required|exists:pets,id',
            'owner_id' => 'sometimes|required|exists:owners,id',
            'service_id' => 'sometimes|required|exists:services,id',
            'status' => 'nullable|in:Pending,In Progress,Completed',
        ]);

        if (array_key_exists('status', $data) && $data['status'] === null) {
            unset($data['status']);
        }

        $appointment->update($data);

        return $this->format($appointment->load(['pet', 'owner', 'service']));
    }

    public function destroy(Appointment $appointment)
    {
        $appointment->delete();

        return response()->noContent();
    }
}