//
//  MS_LcatEdit.m
//  BoneNode
//
//  Created by Martijn Heeroma on 29-05-15.
//
//

#import "MS_LcatEdit.h"

@interface MS_LcatEdit ()

@end

@implementation MS_LcatEdit

- (void)windowDidLoad {
    [super windowDidLoad];
    
    [self.LcatName setStringValue:_VarLcatName];
}

- (IBAction)didTapCancelButton:(id)sender {
    [self.window.sheetParent endSheet:self.window returnCode:NSModalResponseCancel];
}

- (IBAction)didTapDoneButton:(id)sender {
    [self.window.sheetParent endSheet:self.window returnCode:NSModalResponseOK];
}

@end
