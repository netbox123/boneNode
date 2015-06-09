//
//  MSTriggerNew.m
//  BoneNode
//
//  Created by Martijn Heeroma on 29-05-15.
//
//

#import "MSTriggerNew.h"

@interface MSTriggerNew ()

@end

@implementation MSTriggerNew

- (IBAction)didTapCancelButton:(id)sender {
    [self.window.sheetParent endSheet:self.window returnCode:NSModalResponseCancel];
}

- (IBAction)didTapDoneButton:(id)sender {
    [self.window.sheetParent endSheet:self.window returnCode:NSModalResponseOK];
}

@end
