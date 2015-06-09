//
//  MS_LinkDelete.m
//  BoneNode
//
//  Created by Martijn Heeroma on 29-05-15.
//
//

#import "MS_LinkDelete.h"

@interface MS_LinkDelete ()

@end

@implementation MS_LinkDelete

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
