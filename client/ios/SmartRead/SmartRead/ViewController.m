//
//  ViewController.m
//  SmartRead
//
//  Created by Wei, Wei on 22/10/14.
//  Copyright (c) 2014 Wei, Wei. All rights reserved.
//

#import "ViewController.h"
#import "SubscriptionsOverTableViewController.h"

@interface ViewController ()<FBLoginViewDelegate>

@property (strong, nonatomic) SubscriptionsOverTableViewController *overviewController;

@end

@implementation ViewController

- (SubscriptionsOverTableViewController *)overviewController {
    if (!_overviewController) {
        _overviewController = [[SubscriptionsOverTableViewController alloc] init];
    }
    return _overviewController;
}

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    FBLoginView *loginView = [[FBLoginView alloc] initWithReadPermissions:@[@"public_profile", @"email", @"user_friends"]];
    [self.view addSubview:loginView];
    loginView.center = CGPointMake(self.view.frame.size.width / 2, self.view.frame.size.height / 2);
    loginView.delegate = self;
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

- (void)loginViewFetchedUserInfo:(FBLoginView *)loginView user:(id<FBGraphUser>)user {
    self.overviewController.title = [user.name stringByAppendingString:@"'s Subscriptions"];
}

- (void)loginViewShowingLoggedInUser:(FBLoginView *)loginView{
    [self.navigationController pushViewController:self.overviewController animated:YES];
}

@end
