import { MapsAPILoader } from "@agm/core";
import {
  Component,
  ElementRef,
  HostListener,
  Input,
  NgZone,
  OnInit,
  Optional,
  ViewChild,
  inject,
} from "@angular/core";
import { ControlContainer, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";

import {
  GoogleMapBranchHelper,
  GoogleMapBranchState,
} from "./services/googlemap-branch.helper";
import { environment } from '../../../environments/environment';
import { GooglemapBranchService } from "./services/googlemap-branch.service";
import { BaseFpxFormComponent } from "@fpx/core";
import { CommonService } from "src/app/foundation/validator-service/common-service";
import { DeviceDetectorService } from "@dep/core";
@Component({
  selector: "app-googlemap-branch",
  templateUrl: "./googlemap-branch.component.html",
  styleUrls: ["./googlemap-branch.component.scss"],
  providers: [GoogleMapBranchHelper]
})
export class GooglemapBranchComponent extends BaseFpxFormComponent<
  GoogleMapBranchHelper,
  GoogleMapBranchState
> {
  @Input("formCode") formCode: string | any;
  @Input() bankCode: string | any;
  defaultASearchResultList!: any[];
  latitude!: number;
  longitude!: number;
  zoom!: number;
  address!: string;
  private geoCoder!: google.maps.Geocoder;
  public searchElementRef!: ElementRef;
  public branchfinder: any = [];
  public atmpointfinder: any;
  searchResultList: any = [];
  fullResultList: any = [];
  searchText: any;
  Navparams: any;
  searchFilterList: any = [];
  showSearchList!: boolean;
  doShowSearchSettings: boolean = false;
  doShowAccountSettings: boolean = false;
  doShowSearchPanel: boolean = true;
  skeletonContentLoaded = false;
  formOnLoadError: any;
  addressKey = "addressDetails";
  directionsRenderer: any;
  directionsService: any;
  public origin: any = [];
  public destination: any;
  infoWindowOpened: any;
  isGranted: boolean = false;
  previous_info_window = null;
  branchfinderBackup: any = [];
  showSearch: boolean = false;
  showDistance: any;
  maprequestURL: any;
  mapDistanceDetails: any;
  defaultASearchRepResultList: any;
  @ViewChild("search")
  public branchRepFinder: any = [];
  searchRepResultList: any = [];
  duration: any;
  allDestinationDistance: any = [];
  index: number = 0;
  distance: any;

  doShowDirection: boolean = false;
  protected map: any;
  selectedAddress: any;

  @HostListener("document:click", ["$event"]) onDocumentClick(event: any) {
    this.doShowSearchPanel = false;
    this.doShowSearchSettings = false;
  }

  private _loadBranchCode = () => {
    this._googlemapBranchService.fetchBranchMaster().subscribe((res) => {
      this.fullResultList = res;
      this.branchfinderBackup = this.branchfinder = res;
      this.searchResultList = res;
      this.defaultASearchResultList = res;
      res.forEach((item: any, index: number) => {

        this._googlemapBranchService.directionsService?.route(
          {
            origin: this.origin,
            destination: {
              lat: parseFloat(item.latitude),
              lng: parseFloat(item.longitude),
            },
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.IMPERIAL,
          },
          (res: any, status: google.maps.DirectionsStatus) => {

            // this.showDistance = parseFloat(routeLeg.distance.text)*1.60934;
            if (res.routes.length == 0) {
              this.branchfinder[index].distance = "";
              this.duration = "";
              this.allDestinationDistance.push({ distance: this.branchfinder.distance, duration: this.duration })
            } else {
              const route = res.routes?.[0];
              const routeLeg = route.legs[0];
              this.branchfinder[index].distance = Number((routeLeg.distance.value) * 0.001).toFixed(2);
              this.branchfinder[index].duration = routeLeg.duration.text
              this.allDestinationDistance.push({ distance: this.branchfinder.distance, duration: this.branchfinder.duration })
              console.log("routeLegDistance", this.showDistance);
              console.log("routeLegDuration", this.duration);
              this._googlemapBranchService.directionsRenderer?.setDirections(res);
            }

          }
        );
      })
    });
  };

  loactionAccess = {
    granted: this._loadBranchCode,
    prompt: this._loadBranchCode,
    denied: this._loadBranchCode,
  };

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private _googlemapBranchService: GooglemapBranchService,
    public _commonService: CommonService,
    protected device: DeviceDetectorService = inject(DeviceDetectorService),
    private ngZone: NgZone,
    public __googleMapBranchHelper: GoogleMapBranchHelper,
    _formBuilder: FormBuilder,
    private _router: Router,
    @Optional() controlContainer: ControlContainer,
  ) {
    super(_formBuilder, _router, controlContainer, __googleMapBranchHelper);
  }

  protected override doPreInit(): void {
    // this._commonService.switchLanguage$.asObservable().subscribe({
    //   next: (res: string) => {
    //     this.addressKey = res === "En" ? "address" : "branchAddressArabic";
    //   },
    // });
    this.setServiceCode("RETAILMAPBRANCH");
  }

  protected override doPostInit(): void {
    this._googlemapBranchService.getCurrentLocation(
      (position: { coords: { latitude: number; longitude: number; }; }) => {
        // console.log(typeof position.coords.latitude);

        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        // this.longitude = 30.0444;
        // this.latitude = 31.2357;
        this.zoom = 8;
        this.origin = {
          lat: this.latitude,
          lng: this.longitude,
        };
        this.getAddress(this.latitude, this.longitude);

        this._googlemapBranchService.directionsService =
          new google.maps.DirectionsService();
        this._googlemapBranchService.directionsRenderer =
          new google.maps.DirectionsRenderer();

        this.loadMap();
        this.loactionAccess.granted();
      },
      () => {
        this.loactionAccess.granted();
      },

    );
  }


  loadMap() {
    this.mapsAPILoader.load().then(() => {
      console.log("*** MAP API LOADER ***");
      this.geoCoder = new google.maps.Geocoder();
      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef?.nativeElement
      );
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 8;
        });
      });
    });
  }
  closePopup() {
    this._router.navigate(["/welcome/appnavigator"]);
  }
  closePanel() {
    this.showSearch = false;
    this.doShowDirection = false;
    this.map.setCenter({ lat: this.latitude, lng: this.longitude });
    this.filterSearchMenu('');
  }

  selectMarker($event: any, infoWindow: any) {
    console.log("markerrrrrrrr", event);

    if (this.previous_info_window == null)
      this.previous_info_window = infoWindow;
    else {
      this.infoWindowOpened = infoWindow;
      (this.previous_info_window as any).close();
    }
    this.previous_info_window = infoWindow;
  }

  close_window() {
    if (this.previous_info_window != null) {
      (this.previous_info_window as any).close();
    }
  }

  protected mapReady(map:any) {
    this.map = map;
  }

  getDirection(branch: any) {
    console.log("Get direction for ", branch);
    this.selectedAddress = branch;

    this.showSearch = true;
    this.showDistance = branch.distance
    this.destination = {
      lat: parseFloat(branch.latitude), 
      lng: parseFloat(branch.longitude), 
    };

    this._googlemapBranchService.directionsRenderer?.setDirections({ routes: [], geocoded_waypoints: [] });

    this._googlemapBranchService.directionsService?.route(
      {
        origin: this.origin,
        destination: this.destination,
        travelMode: google.maps.TravelMode.DRIVING,
        unitSystem: google.maps.UnitSystem.IMPERIAL,
      },
      (response: any, status: google.maps.DirectionsStatus) => {
        if (status === google.maps.DirectionsStatus.OK) {

          const route = response.routes[0];
          const routeLeg = route.legs[0];
          this.showDistance = Number((routeLeg.distance.value) * 0.001).toFixed(2);
          this.duration = routeLeg.duration.text
          console.log("routeLegDistance", this.showDistance);
          console.log("routeLegDuration", routeLeg.duration.text);
          this._googlemapBranchService.directionsRenderer?.setDirections(response);
        } else if(status === google.maps.DirectionsStatus.ZERO_RESULTS){
          console.log("No result found");
        }
        else {
          console.log("get direction error");
        }
      }
    );
  }

  getAddress(latitude: number, longitude: number) {
    this.geoCoder?.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results: { formatted_address: string; }[], status: string) => {
        if (status === "OK") {
          if (results[0]) {
            this.zoom = 12;
            this.address = results[0].formatted_address;
          } else {
            // window.alert("No results found");
          }
        } else {
          // window.alert("Geocoder failed due to: " + status);
        }
      }
    );
  }

  navigateTo(item: any) {
    if (item) {
      let searchedValues = this.fullResultList.filter((x: { addressDetails: string; }) => {
        return x.addressDetails.toUpperCase() == item.addressDetails.toUpperCase();
      });
      console.log("mapa", searchedValues);
      this.branchfinder = searchedValues;
      this.getDirection(item);
    }
    this.searchFilterList = [];
    this.doShowSearchSettings = false;
  }
  filterSearchMenu(event: any) {
    if(event) event.stopPropagation();

    let searchText = this.searchText;
    let prop;
    let propBranchName;
    var filteredList: any[] = [];
    if (searchText == undefined || searchText == "") {

      this.branchfinder = this.branchfinderBackup;
    }
    else {
      this.searchResultList.filter((item: { [x: string]: { toString: () => string; }; }) => {
        for (let key in item) {
          prop = item?.[this.addressKey]?.toString()?.toUpperCase().replace(/(<([^>]+)>)/gi, "");
          propBranchName = item?.['branchDesc']?.toString()?.toUpperCase().replace(/(<([^>]+)>)/gi, "");

          if ((prop.indexOf(searchText?.toUpperCase()) > -1) || (propBranchName.indexOf(searchText?.toUpperCase()) > -1)) {
            filteredList.push(item);
            break;
          }
        }
        filteredList = [
          ...new Map(
            filteredList.map((item) => [item[this.addressKey], item])
          ).values(),
        ];
      });
    }
    this.searchFilterList = filteredList;
  }
  showSearchFilterList() {
    this.showSearchList = true;
    this.zoom = 8;
  }
  hideSearchFilterList() {
    this.showSearchList = false;
  }

  showMap() {
    console.log('originDest', this.origin, this.destination);
    window.open(`https://www.google.com/maps/dir/?api=1&origin=${this.origin.lat},${this.origin.lng}&destination=${this.destination.lat},${this.destination.lng}&travelmode=driving`, '_system');
  }
}
