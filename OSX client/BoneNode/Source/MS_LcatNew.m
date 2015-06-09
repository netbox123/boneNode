//
//  MS_LcatNew.m
//  BoneNode
//
//  Created by Martijn Heeroma on 29-05-15.
//
//

#import "MS_LcatNew.h"

@interface MS_LcatNew ()

@end

@implementation MS_LcatNew

- (IBAction)didTapCancelButton:(id)sender {
    [self.window.sheetParent endSheet:self.window returnCode:NSModalResponseCancel];
}

- (IBAction)didTapDoneButton:(id)sender {
    [self.window.sheetParent endSheet:self.window returnCode:NSModalResponseOK];
}

@end
