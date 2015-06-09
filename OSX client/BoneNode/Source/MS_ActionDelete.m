//
//  MS_ActionDelete.m
//  BoneNode
//
//  Created by Martijn Heeroma on 25-05-15.
//
//

#import "MS_ActionDelete.h"

@interface MS_ActionDelete ()

@end

@implementation MS_ActionDelete

- (void)windowDidLoad {
    [super windowDidLoad];
    
    NSString* tekst = @"Do you really want to delete '";
    NSString* name = _VarActionName;
    NSString* tekstna = @"' from the action list ?";
    NSString* strRR = [NSString stringWithFormat:@"%@%@%@", tekst, name, tekstna];
    [self.ActionName setStringValue:strRR];
}

- (IBAction)didTapCancelButton:(id)sender {
    [self.window.sheetParent endSheet:self.window returnCode:NSModalResponseCancel];
}

- (IBAction)didTapDoneButton:(id)sender {
    [self.window.sheetParent endSheet:self.window returnCode:NSModalResponseOK];
}

@end
