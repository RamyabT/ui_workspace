import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';
import { ActiveSpaceInfoService, DeviceDetectorService } from '@dep/core';
import { catchError, forkJoin, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppConfigService } from '../../services/app-config-service/app-config.service';
import { ActivatedRoute } from '@angular/router';
import { RefreshHandlerService } from '@dep/services';

export function appInitializer(
  deviceDetector: DeviceDetectorService,
  refreshHandler: RefreshHandlerService
): () => Promise<any> {
  refreshHandler.handleRefresh();
  
  return (): Promise<any> => {
    return new Promise(async (resolve, reject) => {
      deviceDetector.initialize(() => {
        resolve(true);
      }, reject);
    });
  };
}
