<?php

use App\Models\User;

test('user to array returns expected structure', function () {
    $user = User::factory()->create();

    $array = $user->toArray();

    // Check that all expected keys exist (regardless of order)
    expect($array)->toHaveKeys([
        'id',
        'name',
        'email',
        'email_verified_at',
        'created_at',
        'updated_at',
    ]);
});
