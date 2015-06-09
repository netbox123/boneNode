//
//  MSTriggerDelete.m
//  BoneNode
//
//  Created by Martijn Heeroma on 29-05-15.
//
//

#import "MSTriggerDelete.h"

@interface MSTriggerDelete ()

@end

@implementation MSTriggerDelete

- (void)windowDidLoad {
    [super windowDidLoad];
    
    NSString* tekst = @"Do you really want to delete '";
    NSString* name = _VarTriggerName;
    NSString* tekstna = @"' from the action list ?";
    NSString* strRR = [NSString stringWithFormat:@"%@%@%@", tekst, name, tekstna];
    [self.TriggerName setStringValue:strRR];
}

- (IBAction)didTapCancelButton:(id)sender {
    [self.window.sheetParent endSheet:self.window returnCode:NSModalResponseCancel];
}

- (IBAction)didTapDoneButton:(id)sender {
    [self.window.sheetParent endSheet:self.window returnCode:NSModalResponseOK];
}

@end
