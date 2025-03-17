<?php

use App\Models\Vote;

test('vote to array returns expected structure', function () {
    $vote = Vote::factory()->create();

    $array = $vote->toArray();

    expect($array)->toHaveKeys([
        'id',
        'user_id',
        'project_id',
        'created_at',
        'updated_at',
    ]);
});
