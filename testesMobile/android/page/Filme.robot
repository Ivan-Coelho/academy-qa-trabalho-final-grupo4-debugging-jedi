*** Settings ***

Resource   ../base.robot
Resource   ../page/Page.robot
Library    XML
Library    AppiumLibrary
Library    FakerLibrary

*** Variables ***
${HOME}			                 xpath=//android.view.View[@content-desc="Home"]
${BTN_MENU}		                 xpath=//android.widget.Button[@content-desc="Open navigation menu"] 
${RARO_MDB}                      xpath=//android.view.View[@content-desc="Raromdb"]
${MENU_FILME}                    xpath=//android.view.View[@content-desc="Filmes"]