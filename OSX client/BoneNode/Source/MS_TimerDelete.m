//
//  MS_TimerDelete.m
//  BoneNode
//
//  Created by Martijn Heeroma on 28-05-15.
//
//

#import "MS_TimerDelete.h"

@interface MS_TimerDelete ()

@end

@implementation MS_TimerDelete

- (void)windowDidLoad {
    [super windowDidLoad];
    
    NSString* tekst = @"Do you really want to delete '";
    NSString* name = _VarTimerName;
    NSString* tekstna = @"' from the action list ?";
    NSString* strRR = [NSString stringWithFormat:@"%@%@%@", tekst, name, tekstna];
    [self.TimerName setStringValue:strRR];
}

- (IBAction)didTapCancelButton:(id)sender {
    [self.window.sheetParent endSheet:self.window returnCode:NSModalResponseCancel];
}

- (IBAction)didTapDoneButton:(id)sender {
    [self.window.sheetParent endSheet:self.window returnCode:NSModalResponseOK];
}

@end
