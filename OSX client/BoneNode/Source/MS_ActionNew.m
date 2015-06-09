//
//  MS_ActionNew.m
//  BoneNode
//
//  Created by Martijn Heeroma on 25-05-15.
//
//

#import "MS_ActionNew.h"

@interface MS_ActionNew ()

@end

@implementation MS_ActionNew

- (IBAction)didTapCancelButton:(id)sender {
    [self.window.sheetParent endSheet:self.window returnCode:NSModalResponseCancel];
}

- (IBAction)didTapDoneButton:(id)sender {
    [self.window.sheetParent endSheet:self.window returnCode:NSModalResponseOK];
}

@end
