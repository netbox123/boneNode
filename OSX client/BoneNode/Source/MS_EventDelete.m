//
//  MS_EventDelete.m
//  BoneNode
//
//  Created by Martijn Heeroma on 26-05-15.
//
//

#import "MS_EventDelete.h"

@interface MS_EventDelete ()

@end

@implementation MS_EventDelete

- (void)windowDidLoad {
    [super windowDidLoad];
    
    NSString* tekst = @"Do you really want to delete '";
    NSString* name = _VarName;
    NSString* tekstna = @"' from the event list ?";
    NSString* strRR = [NSString stringWithFormat:@"%@%@%@", tekst, name, tekstna];
    [self.Name setStringValue:strRR];
}

- (IBAction)didTapCancelButton:(id)sender {
    [self.window.sheetParent endSheet:self.window returnCode:NSModalResponseCancel];
}

- (IBAction)didTapDoneButton:(id)sender {
    [self.window.sheetParent endSheet:self.window returnCode:NSModalResponseOK];
}

@end
