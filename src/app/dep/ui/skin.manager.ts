import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";
import { APPCONSTANTS } from "@dep/constants";

@Injectable({
    providedIn: "root",
})

export class SkinManager {
    private _skin:string = "";
    private _entity:string = "";
    public darkModeEnabled:boolean = false;

    _theme:string = "";

    constructor(
        @Inject(DOCUMENT) private document: Document
    ) { }

    public applySkin(tenantId: string = 'dep', entityCode: string = '') {
        let _skin = tenantId.toLowerCase();
        this._skin = _skin;

        let nocache:number = Math.random();
        let configPath: string = `./assets/tenant-config/${_skin}`;

        /* Setting fav icon browser tab */
        const favicon = this.document.getElementById('favicon') as HTMLLinkElement;
        favicon.href = `${configPath}/skins/fav.ico?nocache=${nocache}`;

        /* Setting title browser tab */
        const depWebTitle = this.document.getElementById('depWebTitle') as HTMLTitleElement;
        depWebTitle.innerHTML = tenantId;

        const head = this.document.getElementsByTagName('head')[0];

        let themeLink = this.document.getElementById('tenantSkin') as HTMLLinkElement;
        if (themeLink) {
            themeLink.href = `${configPath}/skins/skin.css?nocache=${nocache}`;
        } else {
            const style = this.document.createElement('link');
            style.id = 'tenantSkin';
            style.rel = 'stylesheet';
            style.type = 'text/css';
            style.href = `${configPath}/skins/skin.css?nocache=${nocache}`;

            head.appendChild(style);
        }

        let tenantExtra = this.document.getElementById('extraStyles') as HTMLLinkElement;
        if (tenantExtra) {
            tenantExtra.href = `${configPath}/skins/extra-styles.css?nocache=${nocache}`;
        } else {
            const style = this.document.createElement('link');
            style.id = 'extraStyles';
            style.rel = 'stylesheet';
            style.type = 'text/css';
            style.href = `${configPath}/skins/extra-styles.css?nocache=${nocache}`;

            head.appendChild(style);
        }
    }

    removeEntitySkin(){
        this._entity = "";
        let themeLink:any = this.document.getElementById('entitySkin') as HTMLLinkElement;
        let entityExtra:any = this.document.getElementById('entityExtraStyles') as HTMLLinkElement;
        if(themeLink) themeLink.remove();
        if(entityExtra) entityExtra.remove();
    }

    public appEntitySkin(tenantId:string = '', entityCode:string = ''){
        let _skin = tenantId.toLowerCase();
        let _entitySkin = entityCode.toLowerCase();
        this._entity = _entitySkin;

        let nocache:number = Math.random();
        let entityConfigPath: string = `./assets/tenant-config/${_skin}/entity/${_entitySkin}`;

        /* Setting fav icon browser tab */
        const favicon = this.document.getElementById('favicon') as HTMLLinkElement;
        favicon.href = `${entityConfigPath}/skins/fav.ico?nocache=${nocache}`;

        /* Setting title browser tab */
        const depWebTitle = this.document.getElementById('depWebTitle') as HTMLTitleElement;
        depWebTitle.innerHTML = entityCode;

        const head = this.document.getElementsByTagName('head')[0];

        let themeLink = this.document.getElementById('entitySkin') as HTMLLinkElement;
        if (themeLink) {
            themeLink.href = `${entityConfigPath}/skins/skin.css?nocache=${nocache}`;
        } else {
            const style = this.document.createElement('link');
            style.id = 'entitySkin';
            style.rel = 'stylesheet';
            style.type = 'text/css';
            style.href = `${entityConfigPath}/skins/skin.css?nocache=${nocache}`;

            head.appendChild(style);
        }

        let entityExtra = this.document.getElementById('entityExtraStyles') as HTMLLinkElement;
        if (entityExtra) {
            entityExtra.href = `${entityConfigPath}/skins/extra-styles.css?nocache=${nocache}`;
        } else {
            const style = this.document.createElement('link');
            style.id = 'entityExtraStyles';
            style.rel = 'stylesheet';
            style.type = 'text/css';
            style.href = `${entityConfigPath}/skins/extra-styles.css?nocache=${nocache}`;

            head.appendChild(style);
        }
    }

    public getSkin():string{
        return this._skin;
    }

    public getAssetFolderPath(tenantOnly:boolean = false):string{
        let path:string = `./assets/tenant-config/${this._skin}/`;
        if(this._entity && !tenantOnly){
            path = `${path}entity/${this._entity}/`;
        }
        return path;
    }

    /** Theme Apply */

    public applyTheme(themeId:String):void{        
        let _themeId = themeId.toLowerCase();
        
        let nocache:number = Math.random();
        let themePath: string = `./assets/themes/${_themeId}`;
        
        const themeStyle = this.document.getElementById('themeStyle') as HTMLLinkElement;
        
        try{
            if(themeStyle){
                themeStyle.href = `${themePath}/theme.css?nocache=${nocache}`;
            }else{           
                const head = this.document.getElementsByTagName('head')[0];
                const style = this.document.createElement('link');
                style.id = 'themeStyle';
                style.rel = 'stylesheet';
                style.type = 'text/css';
                style.href = `${themePath}/theme.css?nocache=${nocache}`;
    
                head.appendChild(style);
            }
            this._theme = _themeId;
            this.darkModeEnabled = _themeId == 'dark';
        } catch(error:any){
            console.log('no-action');
            this.darkModeEnabled = false;
        }
    }

    resetTheme(){
        const themeStyle = this.document.getElementById('themeStyle') as HTMLLinkElement;        
        if(themeStyle){
            const head = this.document.getElementsByTagName('head')[0];
            head.removeChild(themeStyle);
            this._theme = "";
        }
        this.darkModeEnabled = false;
    }

    isDarkMode():boolean{
        return this._theme == 'dark';
    }
}