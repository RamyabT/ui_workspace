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
import { GoogleMapHelper, GoogleMapState } from "./services/google-map.helper";
import { GoogleMapService } from "./services/google-map.service";
import { BaseFpxFormComponent } from "@fpx/core";
import { DeviceDetectorService } from "@dep/core";
@Component({
  selector: "app-google-map",
  templateUrl: "./google-map.component.html",
  styleUrls: ["./google-map.component.scss"],
  providers: [GoogleMapHelper]
})
export class GoogleMapComponent extends BaseFpxFormComponent<
  GoogleMapHelper,
  GoogleMapState
> {
  defaultASearchResultList!: any[];
  latitude!: number;
  longitude!: number;
  zoom!: number;
  address!: string;
  private geoCoder!: google.maps.Geocoder;
  @ViewChild("search")
  public searchElementRef!: ElementRef;
  public atmfinder: any = [];
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
  addressKey = "address";
  directionsRenderer: any;
  directionsService: any;
  public origin: any = [];
  public destination: any;
  infoWindowOpened: any;
  isGranted: boolean = false;
  previous_info_window = null;
  atmfinderBackup: any = [];
  showSearch: boolean = false;
  showDistance: any;
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

  private _loadAtmCode = () => {
    this._googleMapService
      .fetchAtmMaster()
      .subscribe((res: any) => {
        this.fullResultList = res;
        this.atmfinderBackup = this.atmfinder = res;
        this.searchResultList = res;
        this.defaultASearchResultList = res;

        res.forEach((item: any, index: number) => {

          this._googleMapService.directionsService?.route(
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
                this.atmfinder[index].distance = "";
                this.duration = "";
                this.allDestinationDistance.push({ distance: this.atmfinder.distance, duration: this.duration })
              } else {
                const route = res.routes?.[0];
                const routeLeg = route.legs[0];
                this.atmfinder[index].distance = Number((routeLeg.distance.value) * 0.001).toFixed(2);
                this.atmfinder[index].duration = routeLeg.duration.text
                this.allDestinationDistance.push({ distance: this.atmfinder.distance, duration: this.atmfinder.duration })

                this.doShowDirection = true;
                this._googleMapService.directionsRenderer?.setDirections(res);
              }
            }
          );
        })
      });
  };


  loactionAccess = {
    granted: this._loadAtmCode,
    prompt: this._loadAtmCode,
    denied: this._loadAtmCode,
  };

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private _googleMapService: GoogleMapService,
    protected device: DeviceDetectorService = inject(DeviceDetectorService),
    private ngZone: NgZone,
    public _googleMapHelper: GoogleMapHelper,
    _formBuilder: FormBuilder,
    private _router: Router,
    @Optional() controlContainer: ControlContainer,

  ) {
    super(_formBuilder, _router, controlContainer, _googleMapHelper);
  }

  protected override doPostInit(): void {

    this._googleMapService.getCurrentLocation(
      (position: { coords: { latitude: number; longitude: number; }; }) => {
        // console.log(typeof position.coords.latitude);

        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        // this.longitude = 30.749345;
        // this.latitude = 77.836272;
        this.zoom = 8;
        this.origin = {
          lat: this.latitude,
          lng: this.longitude,
        };

        this.getAddress(this.latitude, this.longitude);

        this._googleMapService.directionsService =
          new google.maps.DirectionsService();
        this._googleMapService.directionsRenderer =
          new google.maps.DirectionsRenderer();

        this.loadMap();
        // this.getLocationPermission();
        this.loactionAccess.granted();
      },
      () => {
        // this.getLocationPermission();
        this.loactionAccess.granted();
      }
    );
  }

  protected override doPreInit(): void {
    this.setServiceCode("RETAILMAP");
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

  protected mapReady(map: any) {
    this.map = map;
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
  showMap() {
    window.open(`https://www.google.com/maps/dir/?api=1&origin=${this.origin.lat},${this.origin.lng}&destination=${this.destination.lat},${this.destination.lng}&travelmode=driving`, '_system');
  }

  selectMarker($event: any, infoWindow: any) {
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

  getDirection(address: any) {
    console.log("Get direction for ", address);
    this.searchText = '';
    this.selectedAddress = address;

    this.showSearch = true;
    this.showDistance = address.distance;
    this.destination = {
      lat: parseFloat(address.latitude), //parseInt(atm.latitude),
      lng: parseFloat(address.longitude), // parseInt(atm.longitude)
    };

    this.doShowDirection = true;
    this._googleMapService.directionsRenderer?.setDirections({ routes: [], geocoded_waypoints: [] });

    this._googleMapService.directionsService?.route(
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
          this.doShowDirection = true;
          this._googleMapService.directionsRenderer?.setDirections(response);
        } else {
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
      let searchedValues = this.fullResultList.filter((x: { address: string; }) => {
        return x.address.toUpperCase() == item.address.toUpperCase();
      });
      console.log("mapa", searchedValues);
      this.atmfinder = searchedValues;
      this.getDirection(item);
    }
    this.searchFilterList = [];
    this.doShowSearchSettings = false;
  }
  filterSearchMenu(event: any) {
    if(event) event.stopPropagation();

    let searchText = this.searchText;
    let prop;
    let propAtmName;
    var filteredList: any[] = [];
    if (searchText == undefined || searchText == "") {
      this.atmfinder = this.atmfinderBackup;
    }
    else {
      this.searchResultList.filter((item: { [x: string]: { toString: () => string; }; }) => {
        for (let key in item) {
          prop = item?.[this.addressKey]?.toString()?.toUpperCase().replace(/(<([^>]+)>)/gi, "");
          propAtmName = item?.['atmName']?.toString()?.toUpperCase().replace(/(<([^>]+)>)/gi, "");

          if ((prop.indexOf(searchText?.toUpperCase()) > -1) || propAtmName.indexOf(searchText?.toUpperCase()) > -1) {
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
}
