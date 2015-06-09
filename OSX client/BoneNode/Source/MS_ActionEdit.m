//
//  MS_ActionEdit.m
//  BoneNode
//
//  Created by Martijn Heeroma on 25-05-15.
//
//

#import "MS_ActionEdit.h"

@interface MS_ActionEdit ()

@end

@implementation MS_ActionEdit

- (void)windowDidLoad {
    [super windowDidLoad];
    
    [self.ActionName setStringValue:_VarActionName];
}

- (IBAction)didTapCancelButton:(id)sender {
    [self.window.sheetParent endSheet:self.window returnCode:NSModalResponseCancel];
}

- (IBAction)didTapDoneButton:(id)sender {
    [self.window.sheetParent endSheet:self.window returnCode:NSModalResponseOK];
}

@end
