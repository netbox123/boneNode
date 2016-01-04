//
//  Menulet.m
//  BoneNode
//
//  Created by Martijn Heeroma on 06-11-15.
//
//


//
// Maintained and updated by Stan James
// https://github.com/wanderingstan/IPMenuletExample
//
// Originally  an implementation of the excellent menulet tutorial
// by Andrew Turner, published here:
// http://www.mactech.com/articles/mactech/Vol.22/22.02/Menulet/index.html

#import "Menulet.h"

@implementation Menulet {
    __strong IBOutlet NSMenu *_menuletMenu;
}

- (void) awakeFromNib
{
    //NSLog(@"awakeFromNib");
    
    _statusItem = [[NSStatusBar systemStatusBar] statusItemWithLength:180];
    [_statusItem setHighlightMode:YES];
    [_statusItem setEnabled:YES];
    [_statusItem setToolTip:@"Menulet"];
    //[_statusItem setTarget:self];
    
    // Attach pull-down menu
    [_statusItem setMenu:_menuletMenu];
    
    
    /*
     // Title as string
     [_statusItem setTitle:[NSString stringWithString:@"0.0.0.0"]];
     */
    
    /*
     //Title as Unicode Glyph
     [_statusItem setTitle:[NSString stringWithFormat:@"%C",0x2295]];
     */
    
    // Title as Image + String
    NSImage * menuIcon = [NSImage imageNamed:@"MenuletIcon"];
    [_statusItem setImage:menuIcon];
    [_statusItem setTitle:@"            "];
    
    [_statusItem retain];
    
    [[NSNotificationCenter defaultCenter] addObserver:self
                                             selector:@selector(receiveMemuletNotification:)
                                                 name:@"MemuletNotification"
                                               object:nil];
    
}

- (void) viewDidLoad
{
    NSLog(@"viewDidLoad");
}



- (IBAction) updateIPAddress:(id)sender
{
    NSString *ipAddress = [NSString stringWithContentsOfURL:[NSURL URLWithString:
                                                             @"http://highearthorbit.com/service/myip.php"] encoding:NSASCIIStringEncoding error:nil];
    if (ipAddress != nil) {
        [_statusItem setTitle:ipAddress];
    }
}

- (IBAction)quitAction:(id)sender {
    [[NSApplication sharedApplication] terminate:nil];
}

- (IBAction)tofrontAction:(id)sender {
    //[[NSApplication sharedApplication] activateIgnoringOtherApps : YES];
    [[NSRunningApplication currentApplication] activateWithOptions:(NSApplicationActivateAllWindows | NSApplicationActivateIgnoringOtherApps)];
}

- (void) receiveMemuletNotification:(NSNotification *) notification
{
    
    NSArray * words = [[notification object] componentsSeparatedByString:@"*"];
    NSString *ItemTitle, *AhStr;
    for (NSString * word in words){
        NSString *varid = [[word componentsSeparatedByString:@"#"] objectAtIndex:0];
        NSString *varvalue = [[word componentsSeparatedByString:@"#"] objectAtIndex:1];
        NSString* displStr = [NSString stringWithFormat:@"%@%@", varvalue, @"A"];
        if ([varid  isEqual: @"3002"]){ItemTitle = displStr;}
        displStr = [NSString stringWithFormat:@"%@%@", varvalue, @"Ah"];
        if ([varid  isEqual: @"3003"]){AhStr = displStr;}
        
        displStr = [NSString stringWithFormat:@"%@%@", varvalue, @"˚C"];
        if ([varid  isEqual: @"4004"]){ItemTitle = [NSString stringWithFormat:@" %@ %@ %@", ItemTitle, AhStr,displStr];[_statusItem setTitle:ItemTitle];}
    }
    NSLog(@"MemuletNotification");
}

@end

