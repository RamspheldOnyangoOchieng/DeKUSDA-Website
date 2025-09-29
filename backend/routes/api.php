<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Api\MemberController;
use App\Http\Controllers\Api\ChurchMemberController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\PrayerRequestController;
use App\Http\Controllers\Api\SermonController;
use App\Http\Controllers\Api\MinistryController;
use App\Http\Controllers\Api\AnnouncementController;
use App\Http\Controllers\Api\DonationController;
use App\Http\Controllers\Api\GalleryController;
use App\Http\Controllers\Api\HomepageController;
use App\Http\Controllers\Api\ChurchProjectController;
use App\Http\Controllers\Api\WorshipServiceController;
use App\Http\Controllers\Api\AboutController;
use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\LeaderController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Auth routes
Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/user', [AuthController::class, 'user']);
    });
});

// Test route for API connectivity
Route::get('/test', function () {
    return response()->json([
        'status' => 'success',
        'message' => 'API is working',
        'timestamp' => now()->toISOString()
    ]);
});

// Protected routes
Route::middleware(['auth:sanctum'])->group(function () {
    // Ministry routes
    Route::apiResource('ministries', MinistryController::class);
    Route::get('ministries/category/{category}', [MinistryController::class, 'getByCategory']);
    
    // Events routes (excluding store which is now public for testing)
    Route::apiResource('events', EventController::class)->except(['store']);
    
    // Sermon routes
    Route::apiResource('sermons', SermonController::class);
    Route::post('sermons/upload', [SermonController::class, 'upload']);
    
    // Gallery routes
    Route::apiResource('gallery', GalleryController::class);
    Route::post('gallery/upload', [GalleryController::class, 'upload']);
});

// Debug about controller
Route::get('/about-debug/{pageType}', function ($pageType) {
    try {
        $controller = new App\Http\Controllers\Api\AboutController();
        return $controller->getPageContent($pageType);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => $e->getMessage()
        ], 500);
    }
});

// Authentication Routes (no auth required)
Route::prefix('auth')->group(function () {
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/leader-login', [AuthController::class, 'leaderLogin']);
    Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');
});

// User Route (auth required)
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    
    // Admin routes
    Route::middleware('role:admin')->prefix('admin')->group(function () {
        Route::get('/dashboard', [AdminController::class, 'dashboard']);
        Route::get('/settings', [AdminController::class, 'getSettings']);
        Route::put('/settings', [AdminController::class, 'updateSettings']);
        Route::get('/monthly-stats', [AdminController::class, 'monthlyStats']);
    });
    
    // Member routes
    Route::middleware('role:member')->prefix('member')->group(function () {
        Route::get('/dashboard', [MemberController::class, 'dashboard']);
        Route::get('/profile', [MemberController::class, 'profile']);
        Route::put('/profile', [MemberController::class, 'updateProfile']);
        Route::get('/prayer-requests', [MemberController::class, 'myPrayerRequests']);
        Route::get('/donations', [MemberController::class, 'myDonations']);
        Route::get('/events', [MemberController::class, 'myEvents']);
    });
});

// Public API Routes (no authentication required)
Route::prefix('v1')->group(function () {
    
    // Homepage Content Management
    Route::get('/homepage', [App\Http\Controllers\Api\HomepageController::class, 'index']);
    Route::get('/homepage/slides', [App\Http\Controllers\Api\HomepageController::class, 'getSlides']);
    Route::get('/homepage/content/{section}', [App\Http\Controllers\Api\HomepageController::class, 'getContentBySection']);
    
    // Leaders (public read access)
    Route::get('/leaders', [LeaderController::class, 'index']);
    Route::get('/leaders/{leader}', [LeaderController::class, 'show']);
    
    // Church Projects (public viewing)
    Route::get('/church-projects', [App\Http\Controllers\Api\ChurchProjectController::class, 'index']);
    Route::get('/church-projects/featured', [App\Http\Controllers\Api\ChurchProjectController::class, 'featured']);

    // About Pages Content - Simple Routes (inside v1 group)
    Route::get('/about/{pageType}', function ($pageType) {
    try {
        $content = \App\Models\AboutContent::getPageContent($pageType);
        return response()->json([
            'status' => 'success',
            'data' => $content
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Failed to fetch page content',
            'error' => $e->getMessage()
        ], 500);
    }
    });

    Route::get('/about/{pageType}/{sectionKey}', function ($pageType, $sectionKey) {
    try {
        $content = \App\Models\AboutContent::getSectionContent($pageType, $sectionKey);
        return response()->json([
            'status' => 'success',
            'data' => $content
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'message' => 'Failed to fetch section content',
            'error' => $e->getMessage()
        ], 500);
    }
    });

    // Worship Services (public viewing)
    Route::get('/worship-services', [App\Http\Controllers\Api\WorshipServiceController::class, 'index']);
    
    // Events (public viewing and temporary public creation for testing)
    Route::get('/events', [EventController::class, 'index']);
    Route::get('/events/{event}', [EventController::class, 'show']);
    Route::post('/events', [EventController::class, 'store']); // Temporary public access for testing
    
    // Sermons (public viewing and downloads)
    Route::get('/sermons', [SermonController::class, 'index']);
    Route::get('/sermons/{sermon}', [SermonController::class, 'show']);
    Route::get('/sermons/{sermon}/download/{type}', [SermonController::class, 'download']);
    
    // Ministries (public viewing)
    Route::get('/ministries', [MinistryController::class, 'index']);
    Route::get('/ministries/{ministry}', [MinistryController::class, 'show']);
    
    // Announcements (public viewing)
    Route::get('/announcements', [AnnouncementController::class, 'index']);
    Route::get('/announcements/{announcement}', [AnnouncementController::class, 'show']);
    
    // Gallery (public viewing)
    Route::get('/gallery', [GalleryController::class, 'index']);
    Route::get('/gallery/{gallery}', [GalleryController::class, 'show']);
    
    // Prayer Requests (public submissions and viewing)
    Route::post('/prayer-requests', [PrayerRequestController::class, 'store']);
    Route::get('/prayer-requests/public', [PrayerRequestController::class, 'public']);
    Route::post('/prayer-requests/{prayerRequest}/pray', [PrayerRequestController::class, 'pray']);
    
    // Donations (public submissions)
    Route::post('/donations', [DonationController::class, 'store']);
});

// Public V1 API Routes (no authentication required) - for frontend services expecting /v1/ prefix
Route::prefix('v1')->group(function () {
    // Events (public viewing and creation)
    Route::get('/events', [EventController::class, 'index']);
    Route::get('/events/{event}', [EventController::class, 'show']);
    Route::post('/events', [EventController::class, 'store']);
    
    // Homepage content
    Route::get('/homepage', [HomepageController::class, 'getContent']);
    Route::get('/homepage/slides', [HomepageController::class, 'getSlides']);
    Route::get('/homepage/content/{sectionKey}', [HomepageController::class, 'getSectionContent']);
    
    // Church Projects (public viewing)
    Route::get('/church-projects', [ChurchProjectController::class, 'index']);
    Route::get('/church-projects/{id}', [ChurchProjectController::class, 'show']);
    Route::get('/church-projects/featured', [ChurchProjectController::class, 'featured']);
    
    // Leaders (public viewing)
    Route::get('/leaders', [LeaderController::class, 'index']);
    Route::get('/leaders/{leader}', [LeaderController::class, 'show']);
    
    // Worship Services (public viewing)
    Route::get('/worship-services', [App\Http\Controllers\Api\WorshipServiceController::class, 'index']);
    
    // Prayer Requests (public submissions and viewing)
    Route::post('/prayer-requests', [PrayerRequestController::class, 'store']);
    Route::get('/prayer-requests/public', [PrayerRequestController::class, 'public']);
    Route::post('/prayer-requests/{prayerRequest}/pray', [PrayerRequestController::class, 'pray']);
});

// Protected API Routes (authentication required)
Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    
    // Admin Dashboard
    Route::prefix('admin')->group(function () {
        Route::get('/dashboard', [AdminController::class, 'dashboard']);
        Route::get('/statistics', [AdminController::class, 'statistics']);
        Route::get('/recent-activities', [AdminController::class, 'recentActivities']);
        Route::get('/monthly-stats', [AdminController::class, 'monthlyStats']);
    });
    
    // About Pages Management (Admin only)
    Route::prefix('about')->group(function () {
        Route::post('/content', [AboutController::class, 'updateContent']);
        Route::delete('/content/{id}', [AboutController::class, 'deleteContent']);
    });
    
    // Church Members Management
    Route::apiResource('church-members', ChurchMemberController::class);
    Route::post('church-members/{churchMember}/upload-photo', [ChurchMemberController::class, 'uploadPhoto']);
    
    // Events Management - Additional routes not covered by apiResource
    Route::put('/events/{event}', [EventController::class, 'update']);
    Route::delete('/events/{event}', [EventController::class, 'destroy']);
    Route::post('/events/{event}/upload-image', [EventController::class, 'uploadImage']);
    
    // Sermons Management
    Route::post('/sermons', [SermonController::class, 'store']);
    Route::put('/sermons/{sermon}', [SermonController::class, 'update']);
    Route::delete('/sermons/{sermon}', [SermonController::class, 'destroy']);
    Route::get('/sermons/admin/all', [SermonController::class, 'adminIndex']);
    
    // Ministries Management
    Route::post('/ministries', [MinistryController::class, 'store']);
    Route::put('/ministries/{ministry}', [MinistryController::class, 'update']);
    Route::delete('/ministries/{ministry}', [MinistryController::class, 'destroy']);
    
    // Announcements Management
    Route::post('/announcements', [AnnouncementController::class, 'store']);
    Route::put('/announcements/{announcement}', [AnnouncementController::class, 'update']);
    Route::delete('/announcements/{announcement}', [AnnouncementController::class, 'destroy']);
    
    // Gallery Management
    Route::post('/gallery', [GalleryController::class, 'store']);
    Route::put('/gallery/{gallery}', [GalleryController::class, 'update']);
    Route::delete('/gallery/{gallery}', [GalleryController::class, 'destroy']);
    Route::post('/gallery/upload', [GalleryController::class, 'upload']);
    
    // Prayer Requests Management
    Route::get('/prayer-requests', [PrayerRequestController::class, 'index']);
    Route::get('/prayer-requests/{prayerRequest}', [PrayerRequestController::class, 'show']);
    Route::put('/prayer-requests/{prayerRequest}', [PrayerRequestController::class, 'update']);
    Route::delete('/prayer-requests/{prayerRequest}', [PrayerRequestController::class, 'destroy']);
    Route::post('/prayer-requests/{prayerRequest}/approve', [PrayerRequestController::class, 'approve']);
    
    // Homepage Content Management (Admin only)
    Route::put('/homepage/content/{section}', [App\Http\Controllers\Api\HomepageController::class, 'updateContentBySection']);
    Route::post('/homepage/content', [App\Http\Controllers\Api\HomepageController::class, 'createContent']);
    Route::put('/homepage/content/{id}', [App\Http\Controllers\Api\HomepageController::class, 'updateContent']);
    Route::delete('/homepage/content/{id}', [App\Http\Controllers\Api\HomepageController::class, 'deleteContent']);
    Route::post('/homepage/slides', [App\Http\Controllers\Api\HomepageController::class, 'createSlide']);
    Route::put('/homepage/slides/{id}', [App\Http\Controllers\Api\HomepageController::class, 'updateSlide']);
    Route::delete('/homepage/slides/{id}', [App\Http\Controllers\Api\HomepageController::class, 'deleteSlide']);
    
    // Church Projects Management (Admin only)
    Route::post('/church-projects', [App\Http\Controllers\Api\ChurchProjectController::class, 'store']);
    Route::put('/church-projects/{id}', [App\Http\Controllers\Api\ChurchProjectController::class, 'update']);
    Route::delete('/church-projects/{id}', [App\Http\Controllers\Api\ChurchProjectController::class, 'destroy']);
    
    // Worship Services Management (Admin only)
    Route::post('/worship-services', [App\Http\Controllers\Api\WorshipServiceController::class, 'store']);
    Route::put('/worship-services/{id}', [App\Http\Controllers\Api\WorshipServiceController::class, 'update']);
    Route::delete('/worship-services/{id}', [App\Http\Controllers\Api\WorshipServiceController::class, 'destroy']);
    
    // Donations Management
    Route::get('/donations', [DonationController::class, 'index']);
    Route::get('/donations/{donation}', [DonationController::class, 'show']);
    Route::put('/donations/{donation}', [DonationController::class, 'update']);
    Route::delete('/donations/{donation}', [DonationController::class, 'destroy']);
    Route::get('/donations/reports/summary', [DonationController::class, 'summary']);
    
    // Leaders Management (Admin only)
    Route::post('/leaders', [LeaderController::class, 'store']);
    Route::put('/leaders/{leader}', [LeaderController::class, 'update']);
    Route::delete('/leaders/{leader}', [LeaderController::class, 'destroy']);
    Route::post('/leaders/reorder', [LeaderController::class, 'reorder']);
    
});
