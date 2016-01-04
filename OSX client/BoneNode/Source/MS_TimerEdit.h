//
//  MS_TimerEdit.h
//  BoneNode
//
//  Created by Martijn Heeroma on 28-05-15.
//
//

#import <Cocoa/Cocoa.h>

@interface MS_TimerEdit : NSWindowController
@property (assign) IBOutlet NSTextField *TimerName;
@property (assign) IBOutlet NSTextField *TimerHour;
@property (assign) IBOutlet NSTextField *TimerMin;
@property (assign) IBOutlet NSComboBox *Action;
@property (assign) IBOutlet NSButton *TimerEnable;

@property (assign) IBOutlet NSButton *TimerEnMon;
@property (assign) IBOutlet NSButton *TimerEnTue;
@property (assign) IBOutlet NSButton *TimerEnWed;
@property (assign) IBOutlet NSButton *TimerEnThu;
@property (assign) IBOutlet NSButton *TimerEnFri;
@property (assign) IBOutlet NSButton *TimerEnSat;
@property (assign) IBOutlet NSButton *TimerEnSun;
@property (nonatomic, strong) NSString *varTimerDay;

@property (nonatomic, strong) NSString *varTimerName;
@property (nonatomic, strong) NSString *varTimerHour;
@property (nonatomic, strong) NSString *varTimerMin;
@property (nonatomic, strong) NSString *varAction;
@property (nonatomic, strong) NSNumber *varTimerEnable;
@property (nonatomic, strong) NSNumber *varActionId;
@property (nonatomic, strong) NSArray *actionArray;
@end
