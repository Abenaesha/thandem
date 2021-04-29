exports.up = function (knex) {
	return knex.schema.createTable("rides", (rideTable) => {
		rideTable.increments("ride_id").primary()
		rideTable.string("author").references("users.username").onDelete("CASCADE")
		rideTable.datetime("ride_date").notNullable()
		rideTable.string("route_data", 8000).notNullable()
		rideTable.string("ride_type").notNullable()
		rideTable.string("title").notNullable()
		rideTable.string("description").notNullable()
		rideTable.string("experience_level").notNullable()
		rideTable.integer("joins").defaultTo(0)
		rideTable.string("location").notNullable()
		rideTable.timestamp("created_at").defaultTo(knex.fn.now())
		rideTable.string("distanceInKm").notNullable()
	})
}

exports.down = function (knex) {
	return knex.schema.dropTable("rides")
}

/*
{
    "avatar_url": "https://dgalywyr863hv.cloudfront.net/pictures/athletes/29656122/8899811/1/large.jpg",
    "first_name": "Dan",
    "last_name": "Stevenson",
    "location": "Sheffield, United Kingdom",
    "routes_data": {{
        "routeName": "Edale to Kinder Scout",
        "routePolyline": "ynudIr}bJ[aA[}C[MOq@cAyFL[IiAk@}AE_Ae@}B@c@aAoDHe@Ww@IgAHY\\[Po@QGNn@UH[|@y@v@qGt@iAa@y@iASw@YMyBq@kCTiAh@yBXaAx@g@rAe@NMZVpAC|DNzBCbDJ|AEd@FjBPpBMpAn@tETjCLZ?pADV`@\\fBvFx@jENrCPJd@`AnAxDp@vD?h@b@x@x@pFZr@n@lEXpCAtAL\\V~DCfJFf@K`AN|BQr@AjA~AtGVrBz@dCA`AjAhDdAvBNjBFlNPzATLJxA~@x@Sh@i@VNfAGb@{@jAKEgA~As@~BYhHe@dBKfALnDE~C]vGa@hAG~@g@hBW|Cc@xB_BvCi@X_@tBe@jAiAv@qBfH}@dC}@bBUdAa@r@HNKIy@hCy@bAc@`Bk@pAi@|Cy@fD[hDEtAQp@?b@i@d@aAZw@ANRGZ{A@IFH|@FFKt@QCGRWLOQO?AJ@M]Jg@RUZ@n@KLFFGHLfAOXdAnAv@VIB\\|BE~AQ~Aj@zFBjAU|@AjBK`ARxA?xAGEf@bDATGGTnCMRTPLh@JtF_@pCYp@?`@_@XBP]JYb@w@Hc@b@UDIXWDIPYS{BHoBe@ODe@~@u@L{@m@iACa@Ue@Pa@f@QEQZ_BCKTQGKTu@^o@a@q@N]ZWC[p@g@f@mA[[]wAEGPI[IDLKAJIEDFLQZVtCj@~Ay@FY|B?^YRHl@k@bBFPYzAq@xBVr@d@h@I`@{@NEnBf@dAOnAZp@{@jAu@`@AnA}Av@yFGiEc@qE?_AUqAE}DG[@wBZqBA{A]iD@wFCcBQ}@o@Oq@uACc@NsCj@eAnBSI_BFg@dAL\\ET_@R@BXEQ|@c@v@eAR_At@kHvAuGfA}Cj@y@x@oBVcArCkHzBkIpAgAh@kAd@sBpAuAt@iBb@{Bb@{Dx@{Eh@gJGqGr@yDP}F|@eCbCuCHq@ImAh@IJ]_AaAGuAWOMw@GaOKcBoAeCw@eCUiA@s@eAaDIkAi@wBIGAe@e@mBCsATqACuAHgAIq@DgAMy@@iHAYS{AMo@@_AQqBq@iE_@iAkAmGWk@u@qF[m@s@aCm@kAQcCcAwFwAoEo@aA?_AS{@I}Aq@oFCwEQ_@BqHM}ABs@O_@HuCS}AKGg@j@`@u@a@g@",
        "startLatLng": [53.363171, -1.822494],
        "distanceInKm": 13.729
    },
    {
        "routeName": "Sheffield to the Peaks",
        "routePolyline": "}xxdI~eaHQb@FTNP~@ZX\\M`@{@|ADHXd@bBTTNXp@A\\HVQb@J|@h@r@JZZBRRN\\|@lAh@jAAtBT~Dx@x@`CJb@bAr@dAdAx@fAnAV`@j@`Bp@rCn@zA\\vA`@~@|@z@hApAdApAzA~Bf@zAD?v@fBzB|G`@f@x@`@d@dA@n@TrBj@dDVhGIrCL|@h@xADZC\\L|BGdC]pDk@~EoAtEq@|@gD~DmBrCCJBXUl@]^e@lAAXYZEz@NlAE`AL~DRtCLz@pArF`DhJn@xBv@zDnBbHrB|IrHzSl@z@tD|D~CbMd@fDLhCTvBFjCH|@p@tCbAjCn@pC`@lA|@bFNtCH`DWlD^hDfAhE`@fCBfAGtCFz@Tp@pAjBPv@jBxO@h@KfCAzDOrCB\\E`CGzB^xET`AK|ACvAm@dBGh@GnA@`DPzBhAxEBhAIf@g@vAO^QNe@pAa@nDYrAWj@{@z@o@^Q\\uAnDU|AFtFr@zGNb@`@^r@dAb@jAAb@Ox@Un@wBbDUh@c@tCEnFg@vQIpCYjDEvAOdSYnEUvAGbBPtGHrFT`DNv@Rb@ZIfCgBX{@NeA`@i@J@PDHRPjAHfBd@xB^jAh@z@`BWnFEnASn@[fAIlGfApBj@|BTpCf@p@}@j@mAR}@P}AJqCSeDCoFPcIX_DbBsIlAmCjCsDbAeChByFt@gAx@i@x@@b@Tx@rAT?\\oA^qClBuKbBcIpCyHr@_BjCwE`@qAf@_AP_AFwAM}Co@gHu@ePy@_NgAeX[}CaAeOk@mGkAuV}AwT]kLAoDQyDLcBMuC_@{Gu@qFGaBe@_FEcA]sB]qE_@gBgBkEc@kAAW[eLEyGHkGl@kJ?sBaBoZVoJRmDe@u@yCgBmBwAWg@k@cDYa@{DiBiD_F{@y@aAk@oDuAcBa@gAH_Bj@s@@gTwAmCwAgAw@u@y@y@{Ai@mBcAoNWkBa@aA{@]O[Ae@L}AYsB[i@USu@iCaAsHYmEo@qGAcAgAoFQyAu@kDcA{Da@aCs@_CQcAw@eByAmGe@eC_@}@WgEuAsFqAwCYoAEqCH}@k@wDMkE_@}Cw@iA{AkAMUc@cD]e@?KR[I[i@i@g@iBuA_Dk@iBY]eBzA_BP_B`BcAhBkAfAsCbDMAgA|@{@dAy@^OhAUj@",
        "startLatLng": [53.380157, -1.485919],
        "distanceInKm": 18.708599999999997
    },
    {
        "routeName": "Sheffield river trail",
        "routePolyline": "ynudIr}bJ[aA[}C[MOq@cAyFL[IiAk@}AE_Ae@}B@c@aAoDHe@Ww@IgAHY\\[Po@QGNn@UH[|@y@v@qGt@iAa@y@iASw@YMyBq@kCTiAh@yBXaAx@g@rAe@NMZVpAC|DNzBCbDJ|AEd@FjBPpBMpAn@tETjCLZ?pADV`@\\fBvFx@jENrCPJd@`AnAxDp@vD?h@b@x@x@pFZr@n@lEXpCAtAL\\V~DCfJFf@K`AN|BQr@AjA~AtGVrBz@dCA`AjAhDdAvBNjBFlNPzATLJxA~@x@Sh@i@VNfAGb@{@jAKEgA~As@~BYhHe@dBKfALnDE~C]vGa@hAG~@g@hBW|Cc@xB_BvCi@X_@tBe@jAiAv@qBfH}@dC}@bBUdAa@r@HNKIy@hCy@bAc@`Bk@pAi@|Cy@fD[hDEtAQp@?b@i@d@aAZw@ANRGZ{A@IFH|@FFKt@QCGRWLOQO?AJ@M]Jg@RUZ@n@KLFFGHLfAOXdAnAv@VIB\\|BE~AQ~Aj@zFBjAU|@AjBK`ARxA?xAGEf@bDATGGTnCMRTPLh@JtF_@pCYp@?`@_@XBP]JYb@w@Hc@b@UDIXWDIPYS{BHoBe@ODe@~@u@L{@m@iACa@Ue@Pa@f@QEQZ_BCKTQGKTu@^o@a@q@N]ZWC[p@g@f@mA[[]wAEGPI[IDLKAJIEDFLQZVtCj@~Ay@FY|B?^YRHl@k@bBFPYzAq@xBVr@d@h@I`@{@NEnBf@dAOnAZp@{@jAu@`@AnA}Av@yFGiEc@qE?_AUqAE}DG[@wBZqBA{A]iD@wFCcBQ}@o@Oq@uACc@NsCj@eAnBSI_BFg@dAL\\ET_@R@BXEQ|@c@v@eAR_At@kHvAuGfA}Cj@y@x@oBVcArCkHzBkIpAgAh@kAd@sBpAuAt@iBb@{Bb@{Dx@{Eh@gJGqGr@yDP}F|@eCbCuCHq@ImAh@IJ]_AaAGuAWOMw@GaOKcBoAeCw@eCUiA@s@eAaDIkAi@wBIGAe@e@mBCsATqACuAHgAIq@DgAMy@@iHAYS{AMo@@_AQqBq@iE_@iAkAmGWk@u@qF[m@s@aCm@kAQcCcAwFwAoEo@aA?_AS{@I}Aq@oFCwEQ_@BqHM}ABs@O_@HuCS}AKGg@j@`@u@a@g@",
        "startLatLng": [53.363171, -1.822494],
        "distanceInKm": 13.729
        },
    {
        "routeName": "City centre short cycle",
        "routePolyline": "ynudIr}bJ[aA[}C[MOq@cAyFL[IiAk@}AE_Ae@}B@c@aAoDHe@Ww@IgAHY\\[Po@QGNn@UH[|@y@v@qGt@iAa@y@iASw@YMyBq@kCTiAh@yBXaAx@g@rAe@NMZVpAC|DNzBCbDJ|AEd@FjBPpBMpAn@tETjCLZ?pADV`@\\fBvFx@jENrCPJd@`AnAxDp@vD?h@b@x@x@pFZr@n@lEXpCAtAL\\V~DCfJFf@K`AN|BQr@AjA~AtGVrBz@dCA`AjAhDdAvBNjBFlNPzATLJxA~@x@Sh@i@VNfAGb@{@jAKEgA~As@~BYhHe@dBKfALnDE~C]vGa@hAG~@g@hBW|Cc@xB_BvCi@X_@tBe@jAiAv@qBfH}@dC}@bBUdAa@r@HNKIy@hCy@bAc@`Bk@pAi@|Cy@fD[hDEtAQp@?b@i@d@aAZw@ANRGZ{A@IFH|@FFKt@QCGRWLOQO?AJ@M]Jg@RUZ@n@KLFFGHLfAOXdAnAv@VIB\\|BE~AQ~Aj@zFBjAU|@AjBK`ARxA?xAGEf@bDATGGTnCMRTPLh@JtF_@pCYp@?`@_@XBP]JYb@w@Hc@b@UDIXWDIPYS{BHoBe@ODe@~@u@L{@m@iACa@Ue@Pa@f@QEQZ_BCKTQGKTu@^o@a@q@N]ZWC[p@g@f@mA[[]wAEGPI[IDLKAJIEDFLQZVtCj@~Ay@FY|B?^YRHl@k@bBFPYzAq@xBVr@d@h@I`@{@NEnBf@dAOnAZp@{@jAu@`@AnA}Av@yFGiEc@qE?_AUqAE}DG[@wBZqBA{A]iD@wFCcBQ}@o@Oq@uACc@NsCj@eAnBSI_BFg@dAL\\ET_@R@BXEQ|@c@v@eAR_At@kHvAuGfA}Cj@y@x@oBVcArCkHzBkIpAgAh@kAd@sBpAuAt@iBb@{Bb@{Dx@{Eh@gJGqGr@yDP}F|@eCbCuCHq@ImAh@IJ]_AaAGuAWOMw@GaOKcBoAeCw@eCUiA@s@eAaDIkAi@wBIGAe@e@mBCsATqACuAHgAIq@DgAMy@@iHAYS{AMo@@_AQqBq@iE_@iAkAmGWk@u@qF[m@s@aCm@kAQcCcAwFwAoEo@aA?_AS{@I}Aq@oFCwEQ_@BqHM}ABs@O_@HuCS}AKGg@j@`@u@a@g@",
        "startLatLng": [53.363171, -1.822494],
        "distanceInKm": 13.729
        },
    {
        "routeName": "Hathersage to Castleton",
        "routePolyline": "ynudIr}bJ[aA[}C[MOq@cAyFL[IiAk@}AE_Ae@}B@c@aAoDHe@Ww@IgAHY\\[Po@QGNn@UH[|@y@v@qGt@iAa@y@iASw@YMyBq@kCTiAh@yBXaAx@g@rAe@NMZVpAC|DNzBCbDJ|AEd@FjBPpBMpAn@tETjCLZ?pADV`@\\fBvFx@jENrCPJd@`AnAxDp@vD?h@b@x@x@pFZr@n@lEXpCAtAL\\V~DCfJFf@K`AN|BQr@AjA~AtGVrBz@dCA`AjAhDdAvBNjBFlNPzATLJxA~@x@Sh@i@VNfAGb@{@jAKEgA~As@~BYhHe@dBKfALnDE~C]vGa@hAG~@g@hBW|Cc@xB_BvCi@X_@tBe@jAiAv@qBfH}@dC}@bBUdAa@r@HNKIy@hCy@bAc@`Bk@pAi@|Cy@fD[hDEtAQp@?b@i@d@aAZw@ANRGZ{A@IFH|@FFKt@QCGRWLOQO?AJ@M]Jg@RUZ@n@KLFFGHLfAOXdAnAv@VIB\\|BE~AQ~Aj@zFBjAU|@AjBK`ARxA?xAGEf@bDATGGTnCMRTPLh@JtF_@pCYp@?`@_@XBP]JYb@w@Hc@b@UDIXWDIPYS{BHoBe@ODe@~@u@L{@m@iACa@Ue@Pa@f@QEQZ_BCKTQGKTu@^o@a@q@N]ZWC[p@g@f@mA[[]wAEGPI[IDLKAJIEDFLQZVtCj@~Ay@FY|B?^YRHl@k@bBFPYzAq@xBVr@d@h@I`@{@NEnBf@dAOnAZp@{@jAu@`@AnA}Av@yFGiEc@qE?_AUqAE}DG[@wBZqBA{A]iD@wFCcBQ}@o@Oq@uACc@NsCj@eAnBSI_BFg@dAL\\ET_@R@BXEQ|@c@v@eAR_At@kHvAuGfA}Cj@y@x@oBVcArCkHzBkIpAgAh@kAd@sBpAuAt@iBb@{Bb@{Dx@{Eh@gJGqGr@yDP}F|@eCbCuCHq@ImAh@IJ]_AaAGuAWOMw@GaOKcBoAeCw@eCUiA@s@eAaDIkAi@wBIGAe@e@mBCsATqACuAHgAIq@DgAMy@@iHAYS{AMo@@_AQqBq@iE_@iAkAmGWk@u@qF[m@s@aCm@kAQcCcAwFwAoEo@aA?_AS{@I}Aq@oFCwEQ_@BqHM}ABs@O_@HuCS}AKGg@j@`@u@a@g@",
        "startLatLng": [53.363171, -1.822494],
        "distanceInKm": 13.729
    }},
    "username": "some_guy"
}
*/
