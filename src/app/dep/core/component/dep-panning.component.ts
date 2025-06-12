import {
  ChangeDetectorRef,
  Component,
  Directive,
  Input,
  OnInit,
  Renderer2,
} from "@angular/core";
import { gsap } from "gsap";
import { Subscription } from "rxjs";
import { Router } from "@angular/router";
import { PanningService } from "src/app/dep/services/panning.service";
import { BaseFpxFunctionality } from "@fpx/core";

declare let $: any;

@Directive()
export abstract class DepPanningComponent extends BaseFpxFunctionality implements OnInit {
  @Input() selectedData!: any;
  @Input('index') index!: any;
  private target: string = "";
  private actionOpned: boolean = false;
  private TASK_ITEM_SWIPE_DURATION = 0;
  private TASK_ITEM_SWIPE_LEFT_MAX = 0;
  private TASK_ITEM_SWIPE_RIGHT_MAX = 0;
  //private ACCOUNT_CARD_SWIPE_DISTANCE = 0;

  public rowActionsContainerWidth: number = 0;

  private ACTION_DIV_WIDTH_RIGHT = 78;
  private ACTION_DIV_WIDTH_LEFT = 78;

  private taskSwipeLeftAIs: any = [];
  private taskSwipeRightAIs: any = [];
  private taskSwipeStates: any = [];
  private taskSwipeIndexes: any = [];

  private selectedTaskIndex = -1;
  private swipedTaskIndex = -1;
  private playInProgress = false;

  private panHorizontalInProgress = false;
  private scrollerunlistener: (() => void) | undefined;

  private touchState = {
    x1: 0,
    x2: 0,
    y1: 0,
    y2: 0,
  };

  private taskTouchInProgress = false;
  private touchedTaskIndex: number | null | undefined;

  subcription: Subscription | undefined;
  private readonly _panningService: PanningService;
  private readonly _changeDetectorRef: ChangeDetectorRef;
  private readonly _renderer2: Renderer2;

  private _isLeftActionAvailable: boolean = false;
  private _isRightActionAvailable: boolean = false;

  constructor(
    _renderer2: Renderer2,
    _changeDetectorRef: ChangeDetectorRef,
    _panningService: PanningService,
  ) {
    super();
    this._renderer2 = _renderer2;
    this._changeDetectorRef = _changeDetectorRef;
    this._panningService = _panningService;
  }
  ngOnInit(): void {
    this.doPreInit();
  }

  setLeftActionBtnCount(count: number) {
    this.ACTION_DIV_WIDTH_LEFT = this.ACTION_DIV_WIDTH_LEFT * count;
    if (count == 0) this._isLeftActionAvailable = false;
  }

  setRightActionBtnCount(count: number) {
    this.ACTION_DIV_WIDTH_RIGHT = this.ACTION_DIV_WIDTH_RIGHT * count;
    if (count == 0) this._isRightActionAvailable = false;
  }

  ngAfterViewInit() {
    this.rowActionsContainerWidth = this.ACTION_DIV_WIDTH_LEFT + this.ACTION_DIV_WIDTH_RIGHT;
    if (this._isLeftActionAvailable || this._isRightActionAvailable) {
      this.subcription = this._panningService
        .getTaskSwipeTrigger()
        .subscribe((res: number) => {
          if (this.index != res && this.actionOpned) {
            if (this.taskSwipeRightAIs && this._isLeftActionAvailable) this.taskSwipeRightAIs[this.index].reverse();
            if (this.taskSwipeLeftAIs) this.taskSwipeLeftAIs[this.index].reverse();
          }
        });
      this.teardownAnimations();
      this.setupAnimations();
    }
  }

  ngOnDestroy() {
    if (this.scrollerunlistener) {
      this.scrollerunlistener();
    }
    this.teardownAnimations();
  }

  calculateDimensions() {
    this.TASK_ITEM_SWIPE_LEFT_MAX = -this.ACTION_DIV_WIDTH_RIGHT;
    this.TASK_ITEM_SWIPE_RIGHT_MAX = this.ACTION_DIV_WIDTH_LEFT;
    this.TASK_ITEM_SWIPE_DURATION = 200 / 1000.0;
  }

  teardownAnimations() {
    this.teardownCarouselAnimation();
  }

  teardownCarouselAnimation() {
    this.calculateDimensions();
    this.taskSwipeRightAIs.forEach((item: any) => {
      if (item) {
        item.kill();
        item = null;
      }
    });
    this.taskSwipeLeftAIs.forEach((item: any) => {
      if (item) {
        item.kill();
        item = null;
      }
    });
    if (this.scrollerunlistener) {
      this.scrollerunlistener();
    }
  }

  setupAnimations() {
    this.setupCarouselAnimation();
  }

  setupCarouselAnimation() {
    this.taskSwipeLeftAIs = new Array();
    this.taskSwipeRightAIs = new Array();
    this.taskSwipeStates = new Array();

    let index = this.index;

    let target = "#row_data_" + index;
    this.taskSwipeIndexes.push(index);

    let taskItemSwipeLeftAI = gsap.timeline({
      paused: true,
      duration: this.TASK_ITEM_SWIPE_DURATION,
      ease: "power1.in",
      smoothChildTiming: false,
    });
    taskItemSwipeLeftAI.eventCallback("onComplete", () => {
      // console.log("onComplete taskItemSwipeLeftAI", index);
      this.actionOpned = true;
      $(target).addClass("open");
      this.taskSwipeStates[index] = -1;
      this.doResetPositions(index);
      this.doResetPlay();
    });
    taskItemSwipeLeftAI.eventCallback("onReverseComplete", () => {
      // console.log("onReverseComplete taskItemSwipeLeftAI", index);
      this.actionOpned = false;
      $(target).removeClass("open");
      this.taskSwipeStates[index] = 0;
      this.doResetPlay();
    });

    taskItemSwipeLeftAI.fromTo(
      target + " .task-detail-item",
      { css: { x: 0 } },
      {
        css: {
          x: this.TASK_ITEM_SWIPE_LEFT_MAX
        },
      },
      0
    );

    taskItemSwipeLeftAI.fromTo(
      target + " .seperator-line",
      { css: { x: "68px" } },
      { css: { x: 0 } },
      0
    );

    taskItemSwipeLeftAI.fromTo(
      target + " .task-action-right",
      { css: { opacity: 0, width: (this.ACTION_DIV_WIDTH_RIGHT - 40) } },
      { css: { opacity: 1, width: (this.ACTION_DIV_WIDTH_RIGHT) } },
      0
    );

    this.taskSwipeLeftAIs[index] = taskItemSwipeLeftAI;

    if (this.ACTION_DIV_WIDTH_LEFT) {
      let taskItemSwipeRightAI = gsap.timeline({
        paused: true,
        duration: this.TASK_ITEM_SWIPE_DURATION,
        ease: "power1.in",
        smoothChildTiming: false,
      });
      taskItemSwipeRightAI.eventCallback("onComplete", () => {
        this.actionOpned = true;
        $(target).addClass("open");
        this.taskSwipeStates[index] = 1;
        this.doResetPositions(index);
        this.doResetPlay();
      });
      taskItemSwipeRightAI.eventCallback("onReverseComplete", () => {
        this.actionOpned = false;
        $(target).removeClass("open");
        this.taskSwipeStates[index] = 0;
        this.doResetPlay();
      });
      taskItemSwipeRightAI.fromTo(
        target + " .task-detail-item",
        { css: { x: 0 } },
        {
          css: {
            x: this.TASK_ITEM_SWIPE_RIGHT_MAX
          },
        },
        0
      );
      taskItemSwipeRightAI.fromTo(
        target + ":after",
        {
          css: { x: "74px" },
        },
        {
          css: { x: "64px" },
        },
        0
      );
      taskItemSwipeRightAI.fromTo(
        target + " .task-action-left",
        { css: { opacity: 0, width: (this.ACTION_DIV_WIDTH_LEFT - 40) } },
        { css: { opacity: 1, width: (this.ACTION_DIV_WIDTH_LEFT) } },
        0
      );
      this.taskSwipeRightAIs[index] = taskItemSwipeRightAI;
    }

    this.taskSwipeStates[index] = 0;

    // this.scrollerunlistener = this._renderer2.listen(
    //   document.body,
    //   "scroll",
    //   this.documentScrollerHandler.bind(this)
    // );
    // document.body.addEventListener(
    //   "touchmove",
    //   this.documentTouchMoveHandler.bind(this),
    //   { capture: true, passive: false }
    // );
    // document.body.addEventListener(
    //   "touchend",
    //   this.documentTouchEndHandler.bind(this),
    //   { capture: true, passive: false }
    // );
  }

  doResetPositions(index: any) {
    this.taskSwipeIndexes.forEach((item_index: any, i: any) => {
      if (item_index != index) {
        if (this.taskSwipeStates[item_index] == -1) {
          this.taskSwipeLeftAIs[item_index].reverse();
          //this.seekSwipeLeftAnimation(item_index, 0);
        } else if (this.taskSwipeStates[item_index] == 1 && this._isLeftActionAvailable) {
          this.taskSwipeRightAIs[item_index].reverse();
          //this.seekSwipeRightAnimation(item_index, 0);
        }
        this.taskSwipeStates[item_index] = 0;
      }
    });
  }

  doResetPlay() {
    this.selectedTaskIndex = -1;
    this.playInProgress = false;
    this._changeDetectorRef.detectChanges();
  }

  swipeLeftHandler($event: any) {
    if (this.taskSwipeRightAIs || this.taskSwipeLeftAIs) {
      this._panningService.triggerTaskSwipe(this.index);
    }

    let index: number = this.index;
    // console.log(
    //   "Swipe Left",
    //   index,
    //   this.selectedTaskIndex,
    //   this.taskSwipeStates[index]
    // );
    if (this.playInProgress) {
      console.log("Swipe Left Index Not Eligible For Swipe - Play In Progress");
      return;
    }

    // console.log("Swipe Left Accepted ");
    if (this.taskSwipeStates[index] == 1 && this._isLeftActionAvailable) {
      this.playInProgress = true;
      this.swipedTaskIndex = index;
      this.taskSwipeRightAIs[index].reverse();
    } else if (this.taskSwipeStates[index] == 0) {
      this.playInProgress = true;
      this.swipedTaskIndex = index;
      this.taskSwipeLeftAIs[index].play();
    }
  }

  swipeRightHandler($event: any) {
    if (this.taskSwipeRightAIs || this.taskSwipeLeftAIs) {
      this._panningService.triggerTaskSwipe(this.index);
    }

    let index: number = this.index;
    // console.log(
    //   "Swipe Right",
    //   index,
    //   this.selectedTaskIndex,
    //   this.taskSwipeStates[index]
    // );
    if (this.playInProgress) {
      console.log(
        "Swipe Right Index Not Eligible For Swipe - Play In Progress"
      );
      return;
    }

    // console.log("Swipe Right Accepted");

    if (this.taskSwipeStates[index] == -1) {
      this.playInProgress = true;
      this.swipedTaskIndex = index;
      this.taskSwipeLeftAIs[index].reverse();
    } else if (this.taskSwipeStates[index] == 0) {
      this.playInProgress = true;
      this.swipedTaskIndex = index;
      this.taskSwipeRightAIs[index].play();
    }
  }

  getAccountCardSwipeLeftProgress(deltaX: any) {
    let progress = Math.abs((deltaX / this.TASK_ITEM_SWIPE_LEFT_MAX) * 100);
    return Math.min(100, progress);
  }

  getAccountCardSwipeRightProgress(deltaX: any) {
    let progress = Math.abs((deltaX / this.TASK_ITEM_SWIPE_RIGHT_MAX) * 100);
    return Math.min(100, progress);
  }

  seekSwipeLeftAnimation(index: any, progress: any) {
    let seekTime = this.TASK_ITEM_SWIPE_DURATION * (progress / 100);
    // console.log("Seek", progress, seekTime, this.taskSwipeStates[index]);
    let animeInstances = [];
    animeInstances.push(this.taskSwipeLeftAIs[index]);
    animeInstances.forEach((item) => {
      if (item) {
        item.pause().totalProgress(progress / 100.0);
      }
    });
  }

  seekSwipeRightAnimation(index: any, progress: any) {
    let seekTime = this.TASK_ITEM_SWIPE_DURATION * (progress / 100);
    // console.log("Seek", progress, seekTime, this.taskSwipeStates[index]);
    let animeInstances = [];
    animeInstances.push(this.taskSwipeRightAIs[index]);
    animeInstances.forEach((item) => {
      if (item) {
        item.pause().totalProgress(progress / 100.0);
      }
    });
  }

  panStartHandler($event: any) {
    if (this.taskSwipeRightAIs || this.taskSwipeLeftAIs) {
      this._panningService.triggerTaskSwipe(this.index);
    }

    let index = this.index;
    console.log("Pan Start", index, this.selectedTaskIndex, $event.center.x);
    if (this.playInProgress) {
      console.log("Pan Start Index Not Eligible For Swipe - Play In Progress");
      return;
    }

    let target = "#row_data_" + index;
    this.actionOpned = false;
    $(target).removeClass("open");

    if (this.selectedTaskIndex == -1) {
      this.doResetPositions(index);
      this.playInProgress = false;
      this.selectedTaskIndex = index;
    }
  }

  panEndHandler($event: any) {
    let index = this.index;
    this.panHorizontalInProgress = false;
    // console.log(
    //   "Pan End",
    //   index,
    //   this.swipedTaskIndex,
    //   this.selectedTaskIndex,
    //   $event.deltaX
    // );
    if (index == this.swipedTaskIndex) {
      this.swipedTaskIndex = -1;
      console.log("Pan End Skipped Pan End On Swipe Event");
      return;
    }

    if (this.swipedTaskIndex != -1 && this.playInProgress) {
      console.log("Pan End Index Not Eligible For Swipe - Play In Progress");
      return;
    }

    if (index != this.selectedTaskIndex) {
      console.log("Pan End Index Not Eligible For Swipe");
      return;
    }

    if ($event.deltaX >= 0) {
      if (this.taskSwipeStates[index] == 0) {
        let progress = this.getAccountCardSwipeRightProgress($event.deltaX);
        // console.log(
        //   "Pan End Swipe Right",
        //   index,
        //   this.selectedTaskIndex,
        //   $event.deltaX,
        //   progress
        // );
        if (progress > 50) {
          console.log("Pan End - Swipe Right 0 Play");
          this.playInProgress = true;
          //this.seekSwipeRightAnimation(index, progress);
          this.taskSwipeRightAIs[index].play();
        } else {
          console.log("Pan End - Swipe Right 0 Reverse");
          this.playInProgress = true;
          //this.seekSwipeRightAnimation(index, progress);
          this.taskSwipeRightAIs[index].reverse();
        }
      } else if (this.taskSwipeStates[index] == -1) {
        let progress = this.getAccountCardSwipeLeftProgress($event.deltaX);
        // console.log(
        //   "Pan End Swipe Left",
        //   index,
        //   this.selectedTaskIndex,
        //   $event.deltaX,
        //   progress
        // );
        if (progress > 50) {
          console.log("Pan End - Swipe Right -1 Reverse");
          this.playInProgress = true;
          //this.seekSwipeLeftAnimation(index, progress);
          this.taskSwipeLeftAIs[index].reverse();
        } else {
          console.log("Pan End - Swipe Right -1 Play");
          this.playInProgress = true;
          //this.seekSwipeLeftAnimation(index, progress);
          this.taskSwipeLeftAIs[index].play();
        }
      } else {
        console.log("Pan End - Swipe Right 1 Rejected");
        this.doResetPlay();
      }
    } else if ($event.deltaX < 0) {
      if (this.taskSwipeStates[index] == 0) {
        let progress = this.getAccountCardSwipeLeftProgress($event.deltaX);
        // console.log(
        //   "Pan End Swipe Left",
        //   index,
        //   this.selectedTaskIndex,
        //   $event.deltaX,
        //   progress
        // );
        if (progress > 50) {
          console.log("Pan End - Swipe Left 0 Play");
          this.playInProgress = true;
          //this.seekSwipeLeftAnimation(index, progress);
          this.taskSwipeLeftAIs[index].play();
        } else {
          console.log("Pan End - Swipe Left 0 Reverse");
          this.playInProgress = true;
          //this.seekSwipeLeftAnimation(index, progress);
          this.taskSwipeLeftAIs[index].reverse();
        }
      } else if (this.taskSwipeStates[index] == 1) {
        let progress = this.getAccountCardSwipeRightProgress($event.deltaX);
        // console.log(
        //   "Pan End Swipe Right",
        //   index,
        //   this.selectedTaskIndex,
        //   $event.deltaX,
        //   progress
        // );
        if (progress > 50) {
          console.log("Pan End - Swipe Right 1 Reverse");
          this.playInProgress = true;
          //this.seekSwipeRightAnimation(index, progress);
          this.taskSwipeRightAIs[index].reverse();
        } else {
          console.log("Pan End - Swipe Right 1 Play");
          this.playInProgress = true;
          //this.seekSwipeRightAnimation(index, progress);
          this.taskSwipeRightAIs[index].play();
        }
      } else {
        console.log("Pan End - Swipe Left -1 Rejected");
        this.doResetPlay();
      }
    }
    if (this.playInProgress) {
      setTimeout(() => {
        this.doResetPlay();
      }, 300);
    }
  }

  panLeftHandler($event: any) {
    let index = this.index;
    let target = "#row_data_" + index;
    let x: number = parseInt(
      gsap.getProperty(target + " .task-detail-item", "x") + ""
    );
    if (this.playInProgress) {
      //console.log("Pan Left Index Not Eligible For Swipe - Play In Progress");
      return;
    }

    if (index == this.swipedTaskIndex) {
      //console.log("Pan Left Skipped - Pan Left On Swipe Event", index, this.swipedTaskIndex);
      return;
    }

    if (this.selectedTaskIndex == -1) {
      //console.log("Pan Left Skipped - No Selected Card", index);
      return;
    }

    this.panHorizontalInProgress = true;

    if ($event.deltaX > 0) {
      if (
        this.taskSwipeStates[index] == 0 ||
        this.taskSwipeStates[index] == 1
      ) {
        /*SWIPE RIGHT SEEK REVERSE*/
        let progress = this.getAccountCardSwipeRightProgress($event.deltaX);
        //console.log("Pan Left Swipe Right Seek Reverse", index, this.taskSwipeStates[index], progress);
        if (progress > 0 && progress < 100) {
          this.seekSwipeRightAnimation(index, progress);
        }
      } else if (this.taskSwipeStates[index] == -1) {
        /*SWIPE LEFT SEEK REVERSE*/
        let progress =
          100 - this.getAccountCardSwipeLeftProgress($event.deltaX);
        //console.log("Pan Left Swipe Left Seek Reverse", index, this.taskSwipeStates[index], progress);
        if (progress > 0 && progress < 100) {
          this.seekSwipeLeftAnimation(index, progress);
        }
      }
    } else if ($event.deltaX < 0) {
      if (this.taskSwipeStates[index] == 0) {
        /*SWIPE LEFT SEEK PLAY*/
        let progress = this.getAccountCardSwipeLeftProgress($event.deltaX);
        //console.log("Pan Left Swipe Left Seek Play", index, this.taskSwipeStates[index], progress);
        if (progress > 0 && progress < 100) {
          this.seekSwipeLeftAnimation(index, progress);
        }
      } else if (this.taskSwipeStates[index] == 1) {
        /*SWIPE RIGHT SEEK REVERSE*/
        let progress =
          100 - this.getAccountCardSwipeRightProgress($event.deltaX);
        //console.log("Pan Left Swipe Right Seek Reverse", index, this.taskSwipeStates[index], progress);
        if (progress > 0 && progress < 100) {
          this.seekSwipeRightAnimation(index, progress);
        }
      }
    }
  }

  panRightHandler($event: any) {
    let index = this.index;
    let target = "#row_data_" + index;
    // console.log(
    //   "Pan Right",
    //   index,
    //   this.selectedTaskIndex,
    //   $event.deltaX,
    //   this.taskSwipeStates[index],
    //   gsap.getProperty(target + " .task-detail-item", "x")
    // );
    let x = parseInt(gsap.getProperty(target + " .task-detail-item", "x") + "");
    if (this.playInProgress) {
      console.log("Pan Right Index Not Eligible For Swipe - Play In Progress");
      return;
    }

    if (index == this.swipedTaskIndex) {
      // console.log(
      //   "Pan Right Skipped - Pan Right On Swipe Event",
      //   index,
      //   this.swipedTaskIndex
      // );
      return;
    }

    if (this.selectedTaskIndex == -1) {
      // console.log(
      //   "Pan Right Skipped - No Selected Card",
      //   index,
      //   this.selectedTaskIndex
      // );
      return;
    }

    this.panHorizontalInProgress = true;

    if ($event.deltaX > 0) {
      if (this.taskSwipeStates[index] == 0) {
        /*SWIPE RIGHT SEEK*/
        let progress = this.getAccountCardSwipeRightProgress($event.deltaX);
        // console.log(
        //   "Pan Right Swipe Right Seek Play",
        //   index,
        //   this.taskSwipeStates[index],
        //   progress
        // );
        if (progress >= 0 && progress < 100) {
          this.seekSwipeRightAnimation(index, progress);
        }
      } else if (this.taskSwipeStates[index] == -1) {
        /*SWIPE LEFT SEEK REVERSE*/
        let progress =
          100 - this.getAccountCardSwipeLeftProgress($event.deltaX);
        // console.log(
        //   "Pan Right Swipe Left Seek Reverse",
        //   index,
        //   this.taskSwipeStates[index],
        //   progress
        // );
        if (progress > 0 && progress < 100) {
          this.seekSwipeLeftAnimation(index, progress);
        }
      }
    } else if ($event.deltaX < 0) {
      if (
        this.taskSwipeStates[index] == 0 ||
        this.taskSwipeStates[index] == -1
      ) {
        /*SWIPE LEFT SEEK PLAY*/
        let progress = this.getAccountCardSwipeLeftProgress($event.deltaX);
        // console.log("Pan Right Swipe Left Seek Play", index, this.taskSwipeStates[index], progress);
        if (progress > 0 && progress < 100) {
          this.seekSwipeLeftAnimation(index, progress);
        }
      } else if (this.taskSwipeStates[index] == 1) {
        /*SWIPE RIGHT SEEK REVERSE*/
        let progress =
          100 - this.getAccountCardSwipeRightProgress($event.deltaX);
        // console.log("Pan Right Swipe Right Seek Reverse", index, this.taskSwipeStates[index], progress);
        if (progress > 0 && progress < 100) {
          this.seekSwipeRightAnimation(index, progress);
        }
      }
    }
  }

  documentTouchMoveHandler($event: any) {
    this.touchState.y2 =
      $event.changedTouches && $event.changedTouches[0].clientY;
    this.touchState.x2 =
      $event.changedTouches && $event.changedTouches[0].clientX;
    let angle = 90;
    if (this.touchState.x2 != this.touchState.x1) {
      angle =
        Math.atan(
          Math.abs(this.touchState.y2 - this.touchState.y1) /
          Math.abs(this.touchState.x2 - this.touchState.x1)
        ) * 57.32;
    }

    if (this.panHorizontalInProgress) {
      //console.log("Touch End", this.touchedTaskIndex, this.taskSwipeStates[this.touchedTaskIndex], angle);
      //console.log("Cancel Pan In Progress Card", $event.cancelable);
      if ($event.cancelable) {
        $event.preventDefault();
        $event.stopPropagation();
      }
    } else if (this.taskTouchInProgress) {
      //console.log("Touch Move", this.touchedTaskIndex, this.taskSwipeStates[this.touchedTaskIndex], angle);
      if (this.taskSwipeStates[this.touchedTaskIndex || "null"] != 0) {
        //console.log("Cancel Move Open Card", $event.cancelable);
        if ($event.cancelable) {
          $event.preventDefault();
          $event.stopPropagation();
        }
      }
    }
  }

  documentTouchEndHandler($event: any) {
    this.touchState.y2 =
      $event.changedTouches && $event.changedTouches[0].clientY;
    this.touchState.x2 =
      $event.changedTouches && $event.changedTouches[0].clientX;
    let angle = 90;
    if (this.touchState.x2 != this.touchState.x1) {
      angle =
        Math.atan(
          Math.abs(this.touchState.y2 - this.touchState.y1) /
          Math.abs(this.touchState.x2 - this.touchState.x1)
        ) * 57.32;
    }

    if (this.panHorizontalInProgress) {
      // console.log(
      //   "Touch End",
      //   this.touchedTaskIndex,
      //   this.taskSwipeStates[this.touchedTaskIndex || "null"],
      //   angle
      // );
      // console.log("Cancel Pan In Progress Card", $event.cancelable);
      if ($event.cancelable) {
        $event.preventDefault();
        $event.stopPropagation();
      }
    } else if (this.taskTouchInProgress) {
      // console.log(
      //   "Touch End",
      //   this.touchedTaskIndex,
      //   this.taskSwipeStates[this.touchedTaskIndex || "null"],
      //   angle
      // );
      if (this.taskSwipeStates[this.touchedTaskIndex || "null"] != 0) {
        // console.log("Cancel End Open Card", $event.cancelable);
        if ($event.cancelable) {
          $event.preventDefault();
          $event.stopPropagation();
        }
      }
    }
    this.taskTouchInProgress = false;
    this.touchedTaskIndex = null;
  }

  documentScrollerHandler($event: any) {
    //console.log("documentScrollerHandler");
    this.doResetPositions(-1);
  }

  touchStartHandler($event: any) {
    let index = this.index;
    // console.log("Touch Start", index);
    this.taskTouchInProgress = true;
    this.touchedTaskIndex = index;
    this.touchState.y1 =
      $event.changedTouches && $event.changedTouches[0].clientY;
    this.touchState.x1 =
      $event.changedTouches && $event.changedTouches[0].clientX;
  }

  doReverseAction() {
    if (this.taskSwipeRightAIs && this.taskSwipeRightAIs.length) this.taskSwipeRightAIs[this.index].reverse();
    if (this.taskSwipeLeftAIs && this.taskSwipeLeftAIs.length) this.taskSwipeLeftAIs[this.index].reverse();
  }

  public doPreInit(): void { }
}
