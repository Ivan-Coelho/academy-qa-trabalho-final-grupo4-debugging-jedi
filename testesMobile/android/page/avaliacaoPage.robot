*** Settings ***

Resource    ../base.robot

*** Variables ***

${HOME}			                 xpath=//android.view.View[@content-desc="Home"]
${BTN_MENU}		                 xpath=//android.widget.Button[@content-desc="Open navigation menu"]
${VIEW_FILME}                    xpath=//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View
${CARD_FILME}                    xpath=//android.widget.ImageView[contains(@content-desc, "")]
${CARD_VALIACAO_AUDIENCIA}       xpath=//android.view.View[contains(@content-desc,"Avaliação da audiência")]
${CARD_VALIACAO_CRITICA}         xpath=//android.view.View[contains(@content-desc,"Avaliação da crítica")]
${CARD_VALIACOES}                xpath=//android.widget.ImageView[contains(@content-desc,"")]/android.view.View[3]
${ADICIONAR_REVIEW}              xpath=//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.widget.Button
${LABEL_TITULO}                  xpath=//android.view.View[@content-desc="Review"]
${BTN_VOLTAR}		             xpath=//android.widget.Button[@content-desc="Back"]
${LABEL_CESCRICAO}               xpath=//android.view.View[@content-desc="Dê sua nota para o filme:"]
${SCORE}                         xpath=//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[3]
${SCORE_1}                       xpath=//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[3]/android.view.View[1]
${SCORE_2}                       xpath=//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[3]/android.view.View[2]
${SCORE_3}                       xpath=//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[3]/android.view.View[3]
${SCORE_4}                       xpath=//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[3]/android.view.View[4]
${SCORE_5}                       xpath=//android.widget.FrameLayout[@resource-id="android:id/content"]/android.widget.FrameLayout/android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[2]/android.view.View/android.view.View[3]/android.view.View[5]
${IMPUT_TEXT_REVIEW}             xpath=//android.widget.EditText
${BTN_SALVAR}		             xpath=//android.widget.Button[@content-desc="Salvar"]
${ERRO_LOGIN}		             xpath=//android.view.View[@content-desc="Faça login e tente novamente."]
${SUCESSO_REVIEW}		         xpath=//android.view.View[@content-desc="Sua review foi adicionada!"]
${ERRO_REVIEW}		             xpath=//android.view.View[@content-desc="Não foi possível adicionar sua review."]