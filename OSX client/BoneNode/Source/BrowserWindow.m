//
//  BrowserWindow.m
//  BoneNode
//
//  Created by Martijn Heeroma on 30-05-15.
//
//

#import "BrowserWindow.h"

@interface BrowserWindow ()

@end

@implementation BrowserWindow


- (void)windowDidLoad {
    [super windowDidLoad];
    [self.webView  setMainFrameURL:[self VarLink]];
    [self.window setTitle:_VarWindowTitle];
    
    [self.Cat setStringValue:_VarCat];
    [self.Link setStringValue:_VarLink];
    [self.Name setStringValue:_VarName];
    
    
    for (int i = 0; i < [self.catArray count]; ++i)
    {
        [self.Cat addItemWithObjectValue:[[self.catArray objectAtIndex:i]objectForKey:@"name"]];
    }
    for (int i = 0; i < [self.linkArray count]; ++i)
    {
        [self.Name addItemWithObjectValue:[[self.linkArray objectAtIndex:i]objectForKey:@"name"]];
    }
}

- (IBAction)catMenu:(id)sender{
    NSUInteger currentRow = [self.Cat indexOfSelectedItem];
    self.catID = [[self.catArray objectAtIndex:currentRow]objectForKey:@"id"];
    NSLog(@"self.catID%@",self.catID);
}

@end
