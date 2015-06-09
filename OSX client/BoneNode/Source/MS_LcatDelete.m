//
//  MS_LcatDelete.m
//  BoneNode
//
//  Created by Martijn Heeroma on 29-05-15.
//
//

#import "MS_LcatDelete.h"

@interface MS_LcatDelete ()

@end

@implementation MS_LcatDelete

- (void)windowDidLoad {
    [super windowDidLoad];
    
    NSString* tekst = @"Do you really want to delete '";
    NSString* name = _VarLcatName;
    NSString* tekstna = @"' from the action list ?";
    NSString* strRR = [NSString stringWithFormat:@"%@%@%@", tekst, name, tekstna];
    [self.LcatName setStringValue:strRR];
}

- (IBAction)didTapCancelButton:(id)sender {
    [self.window.sheetParent endSheet:self.window returnCode:NSModalResponseCancel];
}

- (IBAction)didTapDoneButton:(id)sender {
    [self.window.sheetParent endSheet:self.window returnCode:NSModalResponseOK];
}

@end
