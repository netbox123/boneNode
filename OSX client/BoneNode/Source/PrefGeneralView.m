//
//  PrefGeneralView.m
//  BoneNode
//
//  Created by Martijn Heeroma on 15-04-15.
//
//

#import "PrefGeneralView.h"

@interface PrefGeneralView ()

@end

@implementation PrefGeneralView

- (void)viewDidLoad {
    [super viewDidLoad];
    // Do view setup here.
}

- (IBAction)setGeneralButt:(id)sender {
    NSString *enabletext = @"";
    NSUserDefaults *defaults = [NSUserDefaults standardUserDefaults];
    if ([[self MessagesEnable]state]){enabletext=@"1";}else{enabletext=@"0";}
    [defaults setObject:enabletext forKey:@"messagesEnabled"];
    [defaults synchronize]; 
}

@end
