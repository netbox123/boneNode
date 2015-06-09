//
//  MSTriggerEdit.m
//  BoneNode
//
//  Created by Martijn Heeroma on 29-05-15.
//
//

#import "MSTriggerEdit.h"

@interface MSTriggerEdit ()

@end

@implementation MSTriggerEdit

- (void)windowDidLoad {
    [super windowDidLoad];
    
    [self.TriggerName setStringValue:_VarTriggerName];
}

- (IBAction)didTapCancelButton:(id)sender {
    [self.window.sheetParent endSheet:self.window returnCode:NSModalResponseCancel];
}

- (IBAction)didTapDoneButton:(id)sender {
    [self.window.sheetParent endSheet:self.window returnCode:NSModalResponseOK];
}

@end
