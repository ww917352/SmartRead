//
//  ViewController.m
//  SmartRead
//
//  Created by Wei, Wei on 22/10/14.
//  Copyright (c) 2014 Wei, Wei. All rights reserved.
//

#import "ViewController.h"

@interface ViewController ()

@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do any additional setup after loading the view, typically from a nib.
    FBLoginView *loginView = [[FBLoginView alloc] init];
    [self.view addSubview:loginView];
    loginView.center = CGPointMake(self.view.frame.size.width / 2, self.view.frame.size.height / 2);
}

- (void)didReceiveMemoryWarning {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
}

@end
