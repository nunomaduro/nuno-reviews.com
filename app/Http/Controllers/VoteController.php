<?php

namespace App\Http\Controllers;

use App\Actions\RemoveUpvote;
use App\Actions\UpvoteProject;
use App\Models\Project;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class VoteController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    public function store(Request $request, Project $project, UpvoteProject $action): RedirectResponse
    {
        $result = $action->handle($request->user(), $project);

        if ($result) {
            return back()->with('success', 'Project upvoted successfully.');
        }

        return back()->with('error', 'You have already upvoted this project.');
    }

    public function destroy(Request $request, Project $project, RemoveUpvote $action): RedirectResponse
    {
        $result = $action->handle($request->user(), $project);

        if ($result) {
            return back()->with('success', 'Upvote removed successfully.');
        }

        return back()->with('error', 'You have not upvoted this project.');
    }
}
