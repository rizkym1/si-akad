<?php
$p = App\Models\User::where('role', 'parent')->first();
if(!$p) { 
    $p = App\Models\User::factory()->create([
        'role' => 'parent', 
        'name' => 'Demo Parent', 
        'email' => 'parent@example.com'
    ]); 
}

$s = App\Models\Student::first();
if ($s) { 
    $s->update(['user_id' => $p->id]); 
    echo 'Linked Student ' . $s->full_name . ' to Parent ' . $p->name . "\n"; 
} else { 
    echo "No students found\n"; 
}
