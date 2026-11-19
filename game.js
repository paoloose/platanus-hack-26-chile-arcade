// =====================================================================
// 5 NOCHES EN PLATANUS — Platanus Hack 26: Santiago
// La hackathon terminó. Los ganadores vuelan a San Francisco con Rafa y
// Nacho. Tú te quedaste con el turno de noche. No todos se fueron.
// You never leave the chair: cameras are your eyes, doors your last line.
// =====================================================================
(async () => {
// Release data is raw DEFLATE over UTF-8 JSON, stored as Base64url.
// Decode the bytes and inflate them offline to inspect or edit the tables.
// The bundle holds assets, dialogue, room drawing arguments and shared names.
const packedData = 'nXtNcxu3tuBfQTobSUbwGuhvZ3xTJEXZypVJRaTsm1GUKbAbpPq62U2ju5XIUW69Wd7l1J0_4M1UeeHFKy-mKptUmf_k_ZKpc4AmKdnJjMY2SQANHJzvL9K_OLqqlj3dOI8vLi5c6nyZZZlDLy4il7o0CS7phefeGwrXvaRmAwwvLykeFH4IBxNY5wFsEfGnY_-Sdlt8PCqoM3Jo4LqURwF1Js-OT8nx1KEewEzSuXNJLzi9uAhduI7GLg1dykO8UQiHOl96ngcfnHPnEkEiOjClFxc8CeAyRDlw748Fh7HZA-MtQpxbhA6Hz8fksPe9Q4VPnS_nc9VhhBQFPkI06PKQh3wGyIiZmFm0XO5yH84EwqWBS338F8P-MAxgS5LE8BEEfkeAwcFDprjU6fe-Xf9rRIT_b5FDRUidL5XaoAFYeLFLI5cmADTO4ihCgLNg5koXRmEWRkEMJ3yUG1AXo_hA4jH8dSxU6nwppYStgrsbFCKL8Z8B3ygCiOXiArjCXZpwAOXfHYd2DHvMeJduVAa47vSkN-2NzifkWW_wVyJCqxXzeea7bkd_4FLuG1qACwKwlKH0JZISx36ARMGKQLoCIzE4IEKQhfNlID14aLd5OILtvDsgPP9hB7z4gSh5_gNR8qOHoOQ9mE3eg_nkPZhR3oM55T2YVd6DeRU-mFfhg3kVPphX4YN5FT6YV-EDebV1t8lsBkbvWe8Cdu5-Mk5cDCJ22PmLNFNw1DfbY3TIn4xjAc6rG15a2zewIvSrcdBFr40jm81mjvU4yDMurEP9MpKxjHFPIqWUOApkKEN0q573wAO-eNCBjvI4TVLwoRcXIrBngUyPf25iwmiwnX0KBYS9Oei7n5sglM2-z0Lxvd2DyecmCGWzL9gNnJ2KOi8HDhWgpLM0de5HNYjfk-OT4WhwPLYhLY5RBQEXz_dlJB2M-uYKkLd_dwyXwDjshpefnOY7x4V_d9wd539yXuyc9_y74-68-JPz3s5537877s57f3Le3zkf-HfH3Xn_znkwCtA_4ZkgH9nMJPUxGckCH52FJzqtBVVPUHXR2D0Zon3PIsxikgD2xcbx7GxLwxTBRWht4IKsK9gkJC7apEkwPOm5wjV-w3c9HAkpXO4agYdmr___sn_rcVLIr7YyQt-Ck-TehMebmTCzjefZgvB3QfjJvckWhP_HIKJw51Ts3ZtsQcC-XRAeMBNoMkzGVT-4MzSHzY7uqM1TPcu1wfj58HB85lAeG5_jbAQijD4E-A94ADaJksvU3HiomdPBHDpg0FTwAGCOpmfjEwtTCuFsuO9JzyANl1tMRXRn2CEt3Hv0dkeDcLM_9O4Mu6PBPValidtxO9wVWJjcm2y5HW4EtmGHZ_hhEnGsJIIAE_EwNNrvY74OhiU6tvkBVhq-eY67hfA2XHv5f-ea9X7BH-S25OP_JpPeaHrce9p5xG2ei8WCnJnCDD0uNTWYiwB3x111ZnaZAs1eP9lRl8nw6fnZ8WHvcBdNc1EQhFvRmmoJsoF742hHuNFWQpvDfrA9EPB742hHtfHw5SV16pXOG1U7j39xVnmTXintPHb-8Y-YRb2ERSzpxSxiohf14ZP3eJ8P-KHAd_6ZNdGPYG2Y2M8Id8WM973BX2LGh8Eh7ycsYXzo9RMmWMS8I_-pOIpZyPwj_pQ_E0-9o4j9CFMfhyETfXHkP-VHAD1m_Cg45kcJi1l0DO_eMWfeccJ-_DFm3rec-d_G7B8OdepCqZWlJ2Bi4DH_rwnjDMbJXwF3-z7Ad6RG9MUhvAxtQf8vEWIqDj1DxtBsuEuBOOHPzSthIfPsLDwRfQ_o8HYe_7jdzU8AmR8jeM68zeQ5Z95zmETM63Pm9xMkZqnKptISiAmYNwLZBCwZ8RFcCZ_AQG8EcgqZGPlHvO8b3o34kQBp2Xe71veO4CX6oZkPRd97JgwPRnwY3CdxzE_FgJ-KMZJoZ3zsfxd28zHM-XdiwHEtHvP-dgz7IhaNDWHRkfmMUYqiLxiwlKMExTPBvGeG6PRKzZ3HTsyiQWIF9WPM-IB_u32hHpj3foKaZiRoxne1NWZ-H7UwOoyRPENm8Myg4w_4M3-AjBzwQ_MCdiUDgZ93V0U_GhiFFAN-5iMKfCDsyJtw5k2sUh5y5h8apUyrbGtiE6CKT6IjPoFb-SQ54pMIR-Io7AsciyPeF1MgAN-NbYgjPoz6RpreER_6h7zPj2I0J1TYI6AW-ByBWU18NLDgiE-8o-Dct2MAzc-9F_zeCn_Bp9yuJrh_KzNAGpXTEghSi5j3lDP_qZHaXAF9MYtOUWinSNp5csrPQWfFuTgN-uJUnIc446d3pITrP8IBfhr1-Sm6mFO0u2fCzsUpH_p9cYoWecrRKjnjeF38EhQ0eMkH_ssYACUv-Uu0iX740ug3bIlYfAzv3rGwvgOIGAgG8gciZh0RL5CIF4iHYcvOa-s4DBHermPcWTFu0ez0_uYden_Dk39DIf0NTfhMnCF7zvhh9_LPgEXJmfn8kyf95MwYcjIBnQHheMybxJasQ4_5hxH7h_MrdVayUE2jnMcXzpehEtx1TUoi0wT7enM1z-ZYN7n4B1PNWczDBKOvL4QpS-fRbGa6bhnnETeZa-CniUl5vTRTke0TZrFNWLPZHDMfN57FCqF4iRubO-LMded4hy9cV2KsT_nMjSNzlqccs19f-bMA7429uQpnBj_ppxwh88TiPA9DkeC9yTwIoUtJsetaQ8_VmfROeuRwSAbrfx0eQ-h3eM-hEebPLr2AJB7zbi-8BCxT3_Wx_-b5XuQhd0TouVCWQwPCdDswAQpMrgE5VgCwIAnwMAnwoGCDmekoYOze4HF6PB08AywGBgvou15AXiOgwvbFJdaxXJreqy-54IlN0AWk6pFLL0LI6GNsqWKBAUhELvW9HSS4MEiYVgPWk3DC1pLOYDw4HvUc6oQOooDMcHeRSJM0SZHBnvRsXyJUoQxSB_gFWS8wAsoKTJttHrfBYeiY27CN0OVNtiTqcLAptcP7yF4XOQKJYSAwiwsMO9JABrGtV2I_tDj5XmyFkmBNjKhA0Wx6sL4RiYtpocCKmuM4MpU-JpUWK4OtyewM98x-k9QZ4SY4jndJwiQYuOcLBBNgRg1AQpd6wpLZ763_x3jiUCdyKPSooTq9EH5MDZ1G8bI4S7PUtjOE9HfaGbDpIjC3UCECkxN6WHlu2f0SK3-ThAfmdnqBzQLvngZOjoeTKYg-uCN6zn0ahNRHdPhcpKbxJXzPC3AEdilSy_LAVL6oXZ6pRzfYRJ8I30MO8thIxXBlfDh8Clh4pmXhWSxMs8kwxZfe3OtUUAgUvFBCCh8wpxdQBQnbDwm7f168gwQPtizpvkxxTnuT45OTMRkPJ9OhQx3RczDnTlD5fMq5gM4Kd1H7hPJcU5cIX4TGJXrSmwN7woBegCRiiwSOjS2GnWBMEQldBaNxqFkhjkNkS9xVDgZTb8Muz6gT4jycfHd-POptce7vsC30qeAgOir8S-MrUlvWu8LyzfM96fug_dgi9EzxhX2MxFiu6Pg22ui_d5eJwjVo7jLR4uPv8lDw_x8mCoMS8lAY7f6UiZwjSsa4ufsQ1nWY7nIOaH8Q60S04V10n3XJPda93GFdvMO6k3G__71DnXgnDgnfp1zEaIHxXacXhqEfmm_iFDRsrAWGkfF0wtLCjfpbG0w2ynbPAQcdj_DcfWkOhqPpWe_EoU5i5IkOmXtJJ8_YcCkUsUBvxZVwhW_DfwgB8zPiDP0_FKf3iQSF6CTo2-LaSeVSaXmSl68gpv_inDiPBXXOnMecOofOY-9XimsuznyYnXWz7pnZ71PnvHvChX3k4aIBxbk9HeGiwMXwzlqAa7E9HBg8BD7y7jwKzSMXH0V2kVvE-c4B7tqH8e6zxC4mOPPv7oxwZ3Ln1kvqlPniqsG8RwjqMo49SkHBN0f4Ds0B5gf4hTHz7vzpDgSbA2F3QGCj3Gc83P3jwwF7ggnqx5A90AiPcMqZG2IEundN2J0SlLOQ-h71aEJjPAIoJLH9IoLBDkCf-QH1YurhN5ywiXvUZZEXX9pE7wSodh5fuMwHCAEghvd49oWkhXbg3hl4ZnRJnWo-z1P1XK6cxxecxyao-NR3ga_qp3olV0qbnPJw_Px49HRMMEf7-PZpb9Q7HJ8NJ-TFce_b3oj0oNNEjs56o8HxZDD-wqHOaSEbWbY1eSbTV9COSnOltSSNljXxQnJVwSBTJF1_yPJF5VCn61YxMv2DTZTUuaobWZMbklbLVaGaqqakqGqykKXMKq1w-yeXX-fy77IkkkxkSY60LNO8TiuSViU5k3NJbshIplcVI71i0ZZVTVZSN3mar2TZqJpcyZlev5clqdWizbOKZKpsdGWIUYWhTTFyIkmlF7LM38g0X38o4WAhASPdLgE55lDnbDg4Hk3B9Zyd9Q4hQR8WRGX5PE_zqmPTqtIkzcu0ImWVXqmakZOqJtcqzQE7rVaVbmRJijZVwIxGpYXMKiR-KTPdLmQm4bLBSW9yfHQ86B1iRjZRZNbWqSSLVuosR9S4IJKEpPeckYGcr9-RvMiXeSOzipFRRWpZLIwQCgkTPHOdL_ICuCgZOSnkUhKJjGQOJl7r_97vHY6JAHcO7cje9Nl4RAbj0eDk_HtIyEbkeDQ4PhyOpsOJYYAG0pqKzFtFMnXdqqKx_N1lA9xtUb-jMMNiQ9Eqz_L1B5QKUrNcv63JQssyU-R1q0jTXudKy5KRQ1VnikDzqQQuZq3SS4U6UUhStG_ISqsyyzP5GcFK0AQtEWLxib5o9UYurDzqVJY1XDeSWW42X0lynddNxe4oH1w3z3WudFWSEpQTGmNSk0IiATOZ5lWpavZDOSzI-reiyZcV0WqR16CLRkBpleYlopWtPxCJZ4PHQcJID8e1yuGNyJVcSI2k1iRdv11KLWtKVkpXwLqVrm5U2lSa1PmiBX6uZC1L0Pxcrqo6b_Jridr8ArR5PCHHo8nxZDocOdTprX8DSyHVjSrhHJjoRkFviCwWbQ5P8ixXABL0Kse1Ru3CB_D3utpQMZ_ImuRlnep8ZRhC5EyrkqiSLKV-UzHyvYTr7yp6WaVNq8uKOdgaTqVWp9AUvtMd5kwEO81Vl8U73UnOvGDT5OKmF8QZNOihoeKyhDozWcpSwiQUv1KnqOr6Xv_5YjMER_rx99Oz4dPz0bQ3-Qac5rBE5ss6L4qKElWmsszW7wtZVORa6lyiCwA3crmD5sVmaGB-d77-J3k2PoMMEMGO2jIFs61XudKgn5K0Jamrcv12OWuLCsHNsXGC_ZGPb8-GL44nPfL8mJyen5yQs-F358PJFGCdqeu8lqRpyapVupEkf_O6zZXO5I7lIMAZApwZgEe9k2mPnIMTeP78-POQMqVVevUJHMvxCzvoaDxe_3NEng_JYHw2Xf-LnPTIyfl_RXIHLWpqATZRqzK9aueg29e5KhWR4GnAY2kEvpHuxWYIF0yHEO7OR-RoODzs9wZ_Bbh9VCgwMmMvZFlpmYH9rtqilqQvwA1IUiD4wjhxWTTyunrDyCQnRaEW4Ck3JFOS5ut3WstCbkWKXDOKBKgcDienx8OzaQ9QmKIPy2QNllLpZQ5OelotpXF2CGRV_WT4tQOkd9p7uv7X6AsTAmQqZ-sPQMlMNgoiGyPntXEWBjGwU5iZ-FJXRUVSy1VZkxJ0EL5aYc7lr5CtFgXkCc5Z76h3-_H3XrH-8A2xn7cff5-ufyMKIrMqSKYKIq_zusJRlkudV7B3WJCyVddVZ6_fkFOl5-CCGJlUN-goKWlL4-eqeuOOPx_z2e2JJFcyfSWbq6okjdLLvDRRIauWebmoTEDdZA3U-uAbcgOmtqxqksplXlb3cwZAp6hIA8pUo_tP2zyTGkBvgviVrBsTG66rAqGx22ENRteAH_87RrbydZsXID4FWU0JTFfl54MsJRqNBQm9Vm9go5EHBYe69eyNIteyNiqWylqyW8bY7fBqyRgjz-QNoJCpRhaFwuDeVOCTPw1gtYJADPFBkroD1eVGZUVet3ltAlWua0h8CnUtS5Kt3wMmeWmUU5Mb2KzqZv22BAxA5nAlmeWqZLeQ97xu81WFrFopjZEbYgGE4UwBgYycAOgGDa-Rs0I1xkP0PWNtarlSb6RGA5NFu5xBzrDDRZs6mjOckmulISOQSHWDalmSukXNrxuQ1CQ3mgpQtt6tVqSwmNzApAE7UjpFI8acDSwerQdZm5eNMsmAfFOVUiMC63cFu_2e1DlRddqmVyirLiBqcNAarcwCBpct07ypKGQD1cbkGQO-GgdnfTojp5UmJfgj4PKyRd6NcpC4hpwVTQKymmxXU1VNbLYnKZH1-j2KosSgvMTMD2F_T67kjfUxoLDX4MaugH4yBw_Hbr-XpFHlwoiybmc5uD4w9fWHkpHncv0fsoQt6B3BioBTCvPhO17j7aSagbJDgqS-IP1WlUB9IbUFvX5PkX-mlrBGdDuq6qrRkF9I0Dc0YFXeN90p6F4q9fp9nS8rm-7MqjJvKmMpUzBniAMgFOTzsCBy_R8V5j9ZRRq5nOXrdyVIs9HSXITh1DoudnvY6vUHkqGhdKn7Jl0DErL87xXGhkISLbPcJL0_OEtlTYVkqARzpbKZTF_94DBiQjgoVJnlcOfrdv0OzRCUIM01A0cLKtmCtm7y9bwoJLmW6fq9_IY8q262BNRWilapNenL9JUqM0aOdIX32IhpMd1awk23tXtkAze7nazfL1qF7qTSd1JLRmy4L0A-r1tIUrcQ90R_HyPOJgfY8_v7xPgisGGwL03acmthYO0oaSwSNzaEGWRqMv1CGeUE6axajRn1Mm8oqrciqVayZrcf356v6i8gZzTkqoK8lDegooMrWW0U9FlVSEquqkIy0kvXbz_RLjQHuGqu1-8rCDk6n6GbxbwfHCcEvvUHdju-UaBaH383rk5erd-bemVmlbwEaDZqgdbVLRQHNQQJLD--MQ7XxotlXi_lbuIMbiFDSqDUgZLh9kSRDCHqCkNVnReqRAdQNlrdzerJsNzNcjJFMGelZCnLBlSnS3RWsl6_1bUq4NAkB--DFQ5ZQdVDQcVWValIqfR1XtUQXWtZQA6Gubkmq_VvsyJPK_S5hv1XMs0laXJgEHgrQ2IqtWTkBWQLWFM1qiigrECvqEpgu6pTVcIGdnsKZr1RHhsU9NbTUizf1r9pCeoCyoIWoQwVdVUSXYFjyeAKrJS6ivCGZOrvENlz1WCY2SRMdDc-3WzKT-NWxo2GoFVLawbrd_eLOvTKRQuyIs_kbP1-q9KGA7MqUwvJyKmt0HAvuevKGzmTxlbA3U-gQkUPD9xBwWco-bpRS9k9N16vVEtk7NLESQzzeXmtdJ1XZQ4dF0Y-vr3vxb_YNQ4QGITwqkRugVV2loJigNwAq79is4T-kRJTdM8xYm1tAxTbZORkaybf3NoqWnV1fuckgU2YWqiCzCEBUaRWS1lKa4CMDOsKPfUWbqGM0S5lgRpYSKhZa7C1RYs-0WTwVmlmXf6PqQWmLFKvZKbQELEYgA4SWPOVSbU2yX9vpsG5b43qD2sGidvgBnbbKzNrKhAOZKenmdTg2izhjAyq0iSiWhm0Os0xrt1k-ksJcRSyPGVuREEg2TcmtzIZrYS8T9IuPzHmgfqaVdZEb7qEBzC1_tio-Y2i5OPvcEOrMnADWa7RJcrrSn9zOzJ-tzV5kbT-IsOwV7FtBo-ooKS0WrXW5-3k2ua2pxpcBTYhRr3Bs_Emh4B6wbbzsL9Sq64fYvMnCmg01XL9DrSlUcX63bwqbQqw_mcB_rdRJJ-BODC6IoY2X0i1Ml7acsyELJBPLWdKY1q7ba_dTR9KaNiUbQkUgZ9tNHZp6hZkC6klmgQYAGbOdbvCYI89rEx16aPVriUICG7GvMgmDyStioXp1KjOa-1mfKYQ3VZ-Ng9YtjdEr9-ukDtQALQkbYuVZLenrcpUTVJoOILeASysqRXGA1WaJk5f3KtebN4NXptIcq1KyAg3xbe1xAz6cRsfyshk_a5DA9WsK45vO9eTKaio0FvtEEVJjenkF7e9q__89_9FbhA4OFxk3X_--__E6vpKmh8oraDZCJ6NLFWWt8sVmReVbL7-oWzLfF7pJaklNJe1OCTtc5mXEzP9unuM20k7pW15Tduyoq2c0TZ7RdufVrQt8oa2cjmjbTX_-lrqm7xcQN9GkKptpurnQVXp7OsfSgPlbA8fpfu_aAUdKjLXMm326rzcy6pmL6XweI8LlsRJTKOYCc_b398_8L0oiFngB97-17_-UF5XeUaWMi_39n9BgO31k93rzCXpk_b6KxYApddPWPAoTQ_2OHuEF6U0TfcP9pgbPmL8oC2v9_dxH7uBnXsw-IoF-3Dgq7aaH7DgIE3Zz_hmd_786En70-qAua5_AATAmQPfZY_a6UHC9jc069kTQyVuYBE8Z5zv01n2pF5WVXNVN2q1x1zK3IDq2f7B7ioXlLkRLG9vLa8Bc5eL7b3CMxf7Ltt_NMsAq-hgz7B7b15UlTb7uHDZPrUL0wPhs_39faAUwCPbXj9Z5j_vtdd0c-wAgXjCZfAjDLa__4gF-_92bxG0Y0uzfMJc140fLQE_OaMceMlc1wseAfbMdUVgLvRJ-qRRPzetVuJwb1cB6ev9r1Om__DpI8RAUsCI6a9TNvvDrV_tbp1tsCyeoC4wvZiB4nl7zKMsSChIZ0tLvXrC2Vf3ZRLFtFDlornaS1PDIOyncuCnocwjr5CVCLnYp-Ye5on9A1zijLKEssjfP0COgxGx4BGLg4PaGBYAevVkVf2094raIzze339kcHVRNThlrhtbmQNP8Rq82Fz4qpMMTh892Tv7E8FaRZ3uHySc7RsLYC4IrbKCizagDoAtjHsHexstTFyX7R8AEXiwk3a4cwY84gqsatcMOeOP2uzVgWC-ORHvU5cBM7_-ocznAPzn_-Ky21sY_IWbwU23cvMXzvYN2cgZF48tiv92pOViUBWVhnXf8gOA_uqgg9QqmzQ6LxfY0JNZhpsnTbXCHw4u8vJUNlcwhk3TaooP0kJJjb8ALRuZl9ilnedFMch1Wig7Oa3ysqnt5EylTTes2jJT2c7KpLnBU4uimsliUC2xNlHjldKyyasSHmm5uspTAFfkpeqr5ielSjvrzmuVNrJc4LhWTa9YXUk73K72C1Vmz6vMTpFeMxzrfJGXZnyK1VFlZ2dVI7ezSSo7YFP1c7Mdtbpbzgt1F8I0L-3GF3kNdSJMGl29UhuepVVZGp5AYteofjufKz2pWp2qzeJTiRiaybhOod5vkIC01VqVzTRfwm71M1RiZZPL4kwuV9PqhSxa1esez7V63aoyvQHWyo7oqdQL1Ww2AbJ3TtWN1IDfNaw61JF1nS_g7Kyo0lcKfqJofsmAUq_0UKagOqu2hg_sdC1RTHWDm5u8UBP80T5MqhNoZA9k3f1kE383mcxC80tL-58ZcAQLejGTey5-k89EsH9vJcCV3unp2biHP0cc9E5ONr9Zps7R2Xg03fktevf1OHwFZX_AuP3iZlVIYNTkZDg83fkxPnX6-etWZkd50eA0hUQXBifVpjWJFedS1jkUCw517sjsk_-ffPnr_wE';
const packedBytes = Uint8Array.from(atob(packedData.replace(/-/g, '+').replace(/_/g, '/')), (c) => c.charCodeAt(0));
const arcadeData = await new Response(new Response(packedBytes).body
  .pipeThrough(new DecompressionStream('deflate-raw'))).json();

// Phaser and Web Audio use these original property names. The local aliases
// let SWC shorten repeated calls while keeping the original method receiver.
const [
  DRAW_ADD_COLOR_STOP, DRAW_BEGIN_PATH, DRAW_BRING_TO_TOP, DRAW_CLEAR,
  DRAW_CONTAINER, DRAW_FILL_CIRCLE, DRAW_FILL_POINTS, DRAW_FILL_RECT,
  DRAW_FILL_ROUNDED_RECT, DRAW_FILL_STYLE, DRAW_GLOBAL_COMPOSITE_OPERATION, DRAW_GRAPHICS,
  DRAW_LINE_BETWEEN, DRAW_LINE_STYLE, DRAW_RECTANGLE, DRAW_SET_ALPHA,
  DRAW_SET_ANGLE, DRAW_SET_BLEND_MODE, DRAW_SET_COLOR, DRAW_SET_ORIGIN,
  DRAW_SET_POSITION, DRAW_SET_ROTATION, DRAW_SET_SCALE, DRAW_SET_TEXT,
  DRAW_SET_TEXTURE, DRAW_SET_TILE_POSITION, DRAW_SET_TINT, DRAW_SET_VISIBLE,
  DRAW_STROKE_CIRCLE, AUDIO_CONNECT, AUDIO_CREATE_BUFFER_SOURCE, AUDIO_CREATE_GAIN,
  AUDIO_CREATE_OSCILLATOR, AUDIO_CURRENT_TIME, AUDIO_EXPONENTIAL_RAMP_TO_VALUE_AT_TIME, AUDIO_FREQUENCY,
  AUDIO_GAIN, AUDIO_SET_TARGET_AT_TIME, AUDIO_SET_VALUE_AT_TIME, AUDIO_START,
  AUDIO_VALUE, KEY_ASSIGN, KEY_BLOCKED, KEY_CAMERAS,
  KEY_FOR_EACH, KEY_PUSH, KEY_RANDOM, KEY_RESTED,
  KEY_TILE_SPRITE, KEY_TO_LOWER_CASE, COLOR_000, COLOR_C9B6FF,
  COLOR_FFD400, COLOR_FFF, COLOR_RGBA_0_0_0_25, COLOR_RGBA_0_0_0_55,
  STATE_APPROACH, STATE_CALL, STATE_CODER, STATE_FRONT,
  STATE_MENTORA, STATE_OFFICE, STATE_PITCH, STATE_PITCHER,
  STATE_PLAY, STATE_SLEEP, STATE_SLEEPER, TEXT_BIQUAD_FILTER,
  TEXT_CENTER, TEXT_LO_ALUMBRASTE_DEMASIADO, TEXT_OSCILLATOR, TEXT_PLATANUS_HACK_26,
] = arcadeData.sharedStrings;

const W = 800, H = 600, M = Math, PI = M.PI;
const SAVE_KEY = 'fnap26-progress';
const rnd = (a, b) => a + M[KEY_RANDOM]() * (b - a);
const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
const dist = (ax, ay, bx, by) => M.hypot(ax - bx, ay - by);
const lerp = (a, b, t) => a + (b - a) * t;
const pick = (a) => a[(M[KEY_RANDOM]() * a.length) | 0];

// DO NOT replace existing keys — they match the physical arcade cabinet wiring.
const CABINET_KEYS = {
  P1_U: ['w'], P1_D: ['s'], P1_L: ['a'], P1_R: ['d'],
  P1_1: ['u'], P1_2: ['i'], P1_3: ['o'],
  P1_4: ['j'], P1_5: ['k'], P1_6: ['l'],
  P2_U: ['ArrowUp'], P2_D: ['ArrowDown'], P2_L: ['ArrowLeft'], P2_R: ['ArrowRight'],
  P2_1: ['r'], P2_2: ['t'], P2_3: ['y'],
  P2_4: ['f'], P2_5: ['g'], P2_6: ['h'],
  START1: ['Enter'], START2: ['2'],
};
// Single player game: both sticks drive the same guard.
const KEY2ACT = {};
for (const [code, keys] of Object.entries(CABINET_KEYS)) for (const k of keys) KEY2ACT[k.length == 1 ? k[KEY_TO_LOWER_CASE]() : k] = code.startsWith('START') ? 'S' : code.slice(3);
const held = {}, pressed = {};
let ignoreMenuB1 = false;
const hd = (a) => !!held[a] && (a != '1' || !ignoreMenuB1);
const pr = (a) => !!pressed[a];
const anyPr = () => ['1', '2', '3', '4', '5', '6', 'S'].some(pr);

// =====================================================================
// SPRITES (PCSEF, 24x24, PC-66 palette): one pose per character
// =====================================================================
const P_PAL = arcadeData.palette;
const SPR = arcadeData.sprites;
// Every character is 24 pixels wide. A digit gives a run length, ~ emits an
// empty row, ^ repeats the previous row, and > mirrors the current half-row.
function parseCSEF(s) {
  const w = 24;
  const r = [], p = [];
  for (let i = 0; i < s.length;) {
    if (!p.length) {
      if (s[i] == '~') { r[KEY_PUSH](Array(w).fill('.')); i++; continue; }
      if (s[i] == '^') { if (r.length) r[KEY_PUSH]([...r.at(-1)]); i++; continue; }
    }
    if (s[i] == '>' && p.length >= w / 2) {
      const h = p.slice(0, w / 2);
      r[KEY_PUSH]([...h, ...h.toReversed()]);
      p.length = 0; i++; continue;
    }
    const n = +s[i], c = s[i + 1];
    if (!n) { i++; continue; }
    p[KEY_PUSH](...Array(n).fill(c));
    while (p.length >= w) r[KEY_PUSH](p.splice(0, w));
    i += 2;
  }
  if (p.length) r[KEY_PUSH](p);
  return r;
}
const ROLES = Object.keys(SPR).filter((r) => r != 'chef');

// =====================================================================
// AUDIO (pure WebAudio synthesis)
// =====================================================================
let AC = null, master, effectsGain, menuOutput, muffle, noiseBuf, ambG, droneG, droneF, buzzG, fanG;
// short codes for oscillator / filter types
const TY = { s: 'sine', q: 'square', w: 'sawtooth', t: 'triangle', l: 'lowpass', b: 'bandpass', h: 'highpass' };
const GLOBAL_VOLUME = 1.05;
function initAudio() {
  if (AC) { if (AC.state != 'running') AC.resume(); return; }
  try { AC = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return; }
  const node = (k, type, f, to) => { const n = AC['create' + k](); if (type) n.type = TY[type]; if (f) n[AUDIO_FREQUENCY][AUDIO_VALUE] = f; n[AUDIO_CONNECT](to); return n; };
  const gain = (v, to) => { const g = AC[AUDIO_CREATE_GAIN](); g[AUDIO_GAIN][AUDIO_VALUE] = v; g[AUDIO_CONNECT](to); return g; };
  const comp = menuOutput = AC.createDynamicsCompressor();
  comp.threshold[AUDIO_VALUE] = -16; comp.ratio[AUDIO_VALUE] = 5;
  comp[AUDIO_CONNECT](gain(GLOBAL_VOLUME, AC.destination));
  muffle = node(TEXT_BIQUAD_FILTER, 'l', 9000, comp);
  master = gain(0.8, muffle);
  effectsGain = gain(M.SQRT1_2, master);
  const len = AC.sampleRate * 2;
  noiseBuf = AC.createBuffer(1, len, AC.sampleRate);
  const d = noiseBuf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = M[KEY_RANDOM]() * 2 - 1;
  // ambience: fluorescent hum + room tone
  ambG = gain(0, master);
  node(TEXT_OSCILLATOR, 'w', 50, node(TEXT_BIQUAD_FILTER, 'l', 180, gain(0.05, ambG)))[AUDIO_START]();
  const rn = AC[AUDIO_CREATE_BUFFER_SOURCE](); rn.buffer = noiseBuf; rn.loop = true;
  rn[AUDIO_CONNECT](node(TEXT_BIQUAD_FILTER, 'l', 400, gain(0.05, ambG))); rn[AUDIO_START]();
  // dread drone: detuned saws that open up as the night goes on
  droneG = gain(0, master);
  droneF = node(TEXT_BIQUAD_FILTER, 'l', 120, droneG);
  for (const f of [41, 41.6, 61.7]) node(TEXT_OSCILLATOR, 'w', f, droneF)[AUDIO_START]();
  // The desk fan stays centered as you turn the chair.
  fanG = gain(0, master);
  const fn = AC[AUDIO_CREATE_BUFFER_SOURCE](), am = gain(0.5, fanG), lfo = node(TEXT_OSCILLATOR, 's', 15, gain(0.5, am[AUDIO_GAIN]));
  fn.buffer = noiseBuf; fn.loop = true; fn[AUDIO_CONNECT](node(TEXT_BIQUAD_FILTER, 'b', 320, am)); fn[AUDIO_START](); lfo[AUDIO_START]();
  // the flashlight bulb: a mains buzz with a crackle in it
  buzzG = gain(0, master);
  node(TEXT_OSCILLATOR, 'w', 120, node(TEXT_BIQUAD_FILTER, 'b', 2400, buzzG))[AUDIO_START]();
  const bn = AC[AUDIO_CREATE_BUFFER_SOURCE](); bn.buffer = noiseBuf; bn.loop = true; bn.playbackRate[AUDIO_VALUE] = 0.5;
  bn[AUDIO_CONNECT](node(TEXT_BIQUAD_FILTER, 'h', 5000, gain(0.4, buzzG))); bn[AUDIO_START]();
}
function out(to = effectsGain) {
  const g = AC[AUDIO_CREATE_GAIN](); g[AUDIO_GAIN][AUDIO_VALUE] = 0;
  g[AUDIO_CONNECT](to);
  return g;
}
function env(g, t, vol, dur, a) { g[AUDIO_GAIN][AUDIO_SET_VALUE_AT_TIME](0.0001, t); g[AUDIO_GAIN][AUDIO_EXPONENTIAL_RAMP_TO_VALUE_AT_TIME](vol, t + a); g[AUDIO_GAIN][AUDIO_EXPONENTIAL_RAMP_TO_VALUE_AT_TIME](0.0001, t + dur); }
// tone(freq, dur, type, vol, freqEnd, delay)
function tone(f, dur, type, vol, f2, dl, to) {
  if (!AC || vol <= 0.002) return;
  const t = AC[AUDIO_CURRENT_TIME] + (dl || 0), o = AC[AUDIO_CREATE_OSCILLATOR](), g = out(to);
  o.type = TY[type || 'q'];
  o[AUDIO_FREQUENCY][AUDIO_SET_VALUE_AT_TIME](f, t);
  if (f2) o[AUDIO_FREQUENCY][AUDIO_EXPONENTIAL_RAMP_TO_VALUE_AT_TIME](M.max(20, f2), t + dur);
  env(g, t, vol, dur, 0.008);
  o[AUDIO_CONNECT](g); o[AUDIO_START](t); o.stop(t + dur + 0.02);
}
// noise(dur, vol, filterType, freq, freqEnd, delay, q)
function noise(dur, vol, ft, f, f2, dl, q) {
  if (!AC || vol <= 0.002) return;
  const t = AC[AUDIO_CURRENT_TIME] + (dl || 0), s = AC[AUDIO_CREATE_BUFFER_SOURCE](), fl = AC.createBiquadFilter(), g = out();
  s.buffer = noiseBuf; s.playbackRate[AUDIO_VALUE] = rnd(0.8, 1.2);
  fl.type = TY[ft || 'l']; fl[AUDIO_FREQUENCY][AUDIO_SET_VALUE_AT_TIME](f || 1000, t);
  if (q) fl.Q[AUDIO_VALUE] = q;
  if (f2) fl[AUDIO_FREQUENCY][AUDIO_EXPONENTIAL_RAMP_TO_VALUE_AT_TIME](f2, t + dur);
  env(g, t, vol, dur, 0.01);
  s[AUDIO_CONNECT](fl); fl[AUDIO_CONNECT](g); s[AUDIO_START](t, rnd(0, 1.5)); s.stop(t + dur + 0.05);
}
// sound effects (synthesized)
const sfxChair = (v) => { noise(0.5, 0.25 * v, 'b', 900, 300, 0, 5); noise(0.3, 0.18 * v, 'b', 1400, 700, 0.35, 6); };
const sfxStep = (v, dl) => { noise(0.07, 0.09 * v, 'l', 300, 0, dl); tone(70, 0.06, 's', 0.06 * v, 0, dl); };
const sfxBlip = (v, f) => tone(f || rnd(260, 520), 0.06, 'q', 0.05 * v);
// Menu cues go straight to the compressor so the paused game can stay muted.
const sfxMenu = (confirm) => confirm
  ? tone(580, 0.075, 't', 0.034, 780, 0, menuOutput)
  : tone(640, 0.06, 't', 0.055, 510, 0, menuOutput);
const sfxBabble = (v, base) => { for (let i = 0; i < 5; i++) if (M[KEY_RANDOM]() < 0.8) tone((base || 300) * rnd(0.8, 1.5), 0.05, 'q', 0.045 * v, 0, i * 0.075); };
const sfxSnore = (v) => { noise(1.1, 0.16 * v, 'b', 220, 650, 0, 4); noise(0.9, 0.12 * v, 'b', 600, 200, 1.25, 4); };
const sfxMurmur = (v) => { for (let i = 0; i < 4; i++) tone(rnd(170, 240), 0.14, 't', 0.07 * v, 0, i * 0.16); };
const sfxType = (v) => { for (let i = 0; i < 4; i++) noise(0.02, 0.12 * v, 'h', 3000, 0, i * rnd(0.05, 0.11)); };
const sfxDoor = () => { noise(0.25, 0.5, 'l', 500); tone(55, 0.3, 's', 0.5, 35); };
const sfxKnock = () => { for (let i = 0; i < 3; i++) { noise(0.08, 0.4, 'l', 350, 0, i * 0.22); tone(90, 0.1, 's', 0.3, 60, i * 0.22); } };
// a big rubber flashlight switch: a thunk and a click (on), just a click (off)
const sfxFlash = (on) => { noise(0.03, 0.22, 'h', 2500); tone(on ? 1900 : 1500, 0.02, 'q', 0.07); if (on) tone(90, 0.07, 's', 0.2, 60); };
const sfxClick = () => { tone(1800, 0.02, 'q', 0.08); noise(0.02, 0.1, 'h', 3000); };
const sfxCoffee = () => { for (let i = 0; i < 8; i++) noise(0.12, 0.12, 'b', rnd(300, 900), 0, i * 0.14, 6); };
// the phone bell rings live (so it stops the moment you answer): two bells,
// a clapper alternating between them, double ring then a pause
let ringN = null;
function ringBell(on) {
  if (!AC) return;
  if (!ringN) ringN = [1190, 1430].map((f) => { const o = AC[AUDIO_CREATE_OSCILLATOR](), g = AC[AUDIO_CREATE_GAIN](); o.type = 'triangle'; o[AUDIO_FREQUENCY][AUDIO_VALUE] = f; g[AUDIO_GAIN][AUDIO_VALUE] = 0; o[AUDIO_CONNECT](g); g[AUDIO_CONNECT](master); o[AUDIO_START](); return [o, g]; });
  const k = ((modeT * 44) | 0) % 2;
  ringN[KEY_FOR_EACH](([, g], i) => g[AUDIO_GAIN][AUDIO_SET_TARGET_AT_TIME](on && k == i ? 0.1 : 0, AC[AUDIO_CURRENT_TIME], 0.004));
}
function ringStop() { if (ringN) ringN[KEY_FOR_EACH](([o, g]) => { g[AUDIO_GAIN][AUDIO_VALUE] = 0; o.stop(); }); ringN = null; }
const sfxYawn = () => { tone(330, 1.2, 'w', 0.05, 160); noise(1.2, 0.08, 'b', 500, 250, 0, 2); };
const sfxHeart = (v) => { tone(55, 0.12, 's', 0.35 * v, 40); tone(50, 0.14, 's', 0.25 * v, 38, 0.2); };
const sfxEat = () => { for (let i = 0; i < 5; i++) noise(0.06, 0.2, 'b', 500, 0, i * 0.15, 3); };
// the screamer (FNAF2-style): a stack of detuned saws, warbling fast, driven
// into hard clipping, plus the hiss of a blown speaker and a hit. p = pitch per character
const sfxScream = (p) => {
  if (!AC) return;
  const t = AC[AUDIO_CURRENT_TIME], ws = AC.createWaveShaper(), cv = new Float32Array(512), g = out(), lfo = AC[AUDIO_CREATE_OSCILLATOR](), lg = AC[AUDIO_CREATE_GAIN]();
  for (let i = 0; i < 512; i++) cv[i] = M.tanh((i / 256 - 1) * 8);
  ws.curve = cv; ws[AUDIO_CONNECT](g);
  g[AUDIO_GAIN][AUDIO_SET_VALUE_AT_TIME](0.0001, t); g[AUDIO_GAIN][AUDIO_EXPONENTIAL_RAMP_TO_VALUE_AT_TIME](0.75, t + 0.015); g[AUDIO_GAIN][AUDIO_SET_VALUE_AT_TIME](0.75, t + 1.05); g[AUDIO_GAIN][AUDIO_EXPONENTIAL_RAMP_TO_VALUE_AT_TIME](0.0001, t + 1.7);
  lfo[AUDIO_FREQUENCY][AUDIO_VALUE] = 34; lg[AUDIO_GAIN][AUDIO_VALUE] = 140 * p; lfo[AUDIO_CONNECT](lg); lfo[AUDIO_START](t); lfo.stop(t + 1.8);
  for (const f of [560, 590, 840, 1180, 1660]) {
    const o = AC[AUDIO_CREATE_OSCILLATOR](), og = AC[AUDIO_CREATE_GAIN]();
    o.type = 'sawtooth'; og[AUDIO_GAIN][AUDIO_VALUE] = 0.25;
    o[AUDIO_FREQUENCY][AUDIO_SET_VALUE_AT_TIME](f * p * 0.6, t); o[AUDIO_FREQUENCY][AUDIO_EXPONENTIAL_RAMP_TO_VALUE_AT_TIME](f * p, t + 0.1); o[AUDIO_FREQUENCY][AUDIO_EXPONENTIAL_RAMP_TO_VALUE_AT_TIME](f * p * 0.85, t + 1.6);
    lg[AUDIO_CONNECT](o[AUDIO_FREQUENCY]); o[AUDIO_CONNECT](og); og[AUDIO_CONNECT](ws); o[AUDIO_START](t); o.stop(t + 1.8);
  }
  noise(1.5, 0.5, 'b', 2400 * p, 1100, 0, 0.9);
  tone(60, 0.45, 's', 0.9, 28); noise(0.25, 0.8, 'l', 300);
};
const sfxSix = () => {
  [523, 659, 784, 1046, 784, 1046][KEY_FOR_EACH]((f, i) => tone(f, 0.5, 't', 0.22, 0, i * 0.18));
  for (let i = 0; i < 26; i++) noise(0.05, 0.18 * rnd(0.4, 1), 'b', rnd(1200, 3500), 0, rnd(0, 1.6), 2);
};
const sfxStatic = (d) => noise(d || 0.5, 0.25, 'h', 800);
const sfxErr = () => { tone(200, 0.15, 'q', 0.12); tone(150, 0.2, 'q', 0.12, 0, 0.15); };
const sfxBreath = (v) => { noise(1.2, 0.07 * v, 'b', 700, 400, 0, 2); noise(1.0, 0.05 * v, 'b', 500, 800, 1.4, 2); };
const sfxFar = () => {
  if (M[KEY_RANDOM]() < 0.5) { noise(0.5, 0.18, 'l', 400); tone(50, 0.4, 's', 0.2, 35); }
  else for (let i = 0; i < 4; i++) sfxStep(0.5 + i * 0.15, i * 0.4);
};
// Room movement uses the same footsteps, louder near the office.
function sfxRoom(v) {
  for (let i = 0; i < 3; i++) sfxStep(v, i * 0.32);
}
// the floorboard right outside a door: someone just stepped into your doorway
const sfxCreak = () => { noise(0.7, 0.16, 'b', 320, 170, 0, 9); tone(150, 0.55, 't', 0.035, 105); };
// your chair turning
const sfxSwivel = () => noise(0.16, 0.035, 'b', 1300, 650, 0, 4);
// the sleepwalker stirs: "mm...?"
const sfxStir = () => {
  noise(.24, .34, 'h', 1500, 650);
  noise(.15, .20, 'b', 960, 330, .12, 2);
};
// something is in the room with you
const sfxGroan = () => { tone(46, 2.6, 's', 0.1, 38); noise(2.6, 0.05, 'l', 160, 60); };

// =====================================================================
// WORLD — the venue is a graph of rooms joined by doorways (FNAF-style map).
// Every room has its own floor plan (w x d units, walls 240 high), a camera
// (position + look-at point), exits [to, wall, offset] and spots to stand on.
//
//      COCINA(6) · CÓDIGO(1A) · PITCH(1C)
//                  COMEDOR(1B) · BAÑOS(7)
//   SIESTA(5) PASILLO O(2A)  CENTRAL(9)  PASILLO E(4A) LOBBY(8)
//   BODEGA(3)  ESQUINA O(2B) [ OFICINA ] ESQUINA E(4B)
// =====================================================================
const CTRL = 13; // your office: three entrances, no camera
// [name, cam, w, d, map rect, floor A, floor B, wall, tile, camera [x,y,z, look x,y,z, focal], exits, spots]
const ROOMS = arcadeData.rooms;
// Screen neighbors, independent of the corridors enemies use to travel.
const CAMERA_LINKS = arcadeData.cameraLinks;
const OFFICE_MAP = arcadeData.officeMap;
// how much light each room has of its own on camera (without your flashlight):
// the code room's laptops, the projector, the kitchen... and the rooms right
// next to you are pitch black: there you have to light it to see who's coming
const AMB = arcadeData.roomLight;
const NB = ROOMS.map((R) => R[10].map((x) => x[0]));
NB[CTRL] = [8, 12, 10];
const CDOOR = { W: { adj: 8 }, N: { adj: 12 }, E: { adj: 10 } };
const ADOOR = ['W', 'N', 'E'], SIDES = ['W', 'E']; // N is the open front hallway: no door
const ROAM = [0, 1, 2, 3, 4, 5, 6, 7, 9, 11]; // where people wander (never the corners or the front hallway)
const ek = (a, b) => (a < b ? a + '-' + b : b + '-' + a);
// the spot just inside room a, at the doorway that leads to room b
function exitPt(a, b) {
  const R = ROOMS[a], [, s, o] = R[10].find((x) => x[0] == b);
  return s == 'N' ? [o, 40] : s == 'S' ? [o, R[3] - 40] : s == 'W' ? [40, o] : [R[2] - 40, o];
}
function bfs(a, b, blk) {
  if (a == b) return [a];
  const prev = { [a]: -1 }, q = [a];
  while (q.length) {
    const r = q.shift();
    for (const n of NB[r]) {
      if (n in prev || blk.has(ek(r, n))) continue;
      prev[n] = r;
      if (n == b) { const p = [b]; let k = b; while (prev[k] != -1) p.unshift((k = prev[k])); return p; }
      q[KEY_PUSH](n);
    }
  }
  return null;
}
const HOP = ROOMS.map((_, r) => bfs(r, CTRL, new Set()).length - 1).concat(0); // rooms away from your office
const mapC = (r) => { const m = r == CTRL ? OFFICE_MAP : ROOMS[r][4]; return [m[0] + m[2] / 2, m[1] + m[3] / 2]; };
const PITCH_HOME = [350, 130], SLEEP_HOME = [220, 250], SEATS = { fe: 180, coder: 350, be: 520 };
const KITCHEN_CHEF = { r: 2, x: 150, y: 120, fx: 1 }; // fixed camera prop, outside the AI and audio loops
// the blind spot right outside each of your doors (no camera sees it)
const blindPt = (d) => exitPt(CDOOR[d].adj, CTRL);
const blindDoor = (e) => ADOOR.find((d) => e.r == CDOOR[d].adj && dist(e.x, e.y, ...blindPt(d)) < 110);

// =====================================================================
// NIGHTS — hl = seconds per in-game hour.
// AI levels 0..20, FNAF-style: every few seconds each one gets a movement
// opportunity and takes a step if rnd(20) < level. Active levels get +1 at
// 2, 3 and 4 AM, so every night gets worse towards the morning.
// Seconds per hour, base drain, sleep time, first wake hour, pitch patience,
// required flashes, movement levels, and power multiplier.
const NIGHTS = arcadeData.nights;
const LV = { fe: 6, be: 7, pitcher: 8, sleeper: 9 };
const FINAL_NIGHT_START = { coder: 15, fe: 34, mentora: 54, pitchDrain: 36, be: 92 };
const CALLS = arcadeData.calls.map((s) => s.split('|'));

// =====================================================================
// GAME STATE
// =====================================================================
let S, mode = 'title', modeT = 0, saved = { night: 1 }, menuNight = 1, FX = null;
// the night in progress (reset by startNight)
let lesson, firstDeparture, scareTablet;
let NN, camLit, litN, night, hl, pitchOn, patience, flashes, pgrace, wakeH, drain, mentoraOn, coderOn, sueRate, nightLen, now, prevCam, lostHint, power, sueno, blackout, cutAt, view, va, pan, panV, focus, camR, statA, light, doors, doorP, flash, hallu, plug, cutH, cof, cofT, cofHold, drink, lidY,
  blink, blinkT, blinkDur, dread, heartT, msgT, flick, scareT, phone, thought, thOnce, doomed, clicking, clickT, yawn1, yawn2,
  usage, lostTo, loseT, scrOn, scrDelay, E;
// how many times each control has been used: prompts fade once learned
const HINT = { light: 0, door: 0, slide: 0 };
const learned = (k, n) => HINT[k] >= (n || 3);

class HorrorPipeline extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
  constructor(game) {
    super({
      game, name: 'Horror',
      // unv = on the cameras, ulit = the camera flashlight, uamb = how much light
      // the room has of its own, uof = the office (bent like a cylinder). Office and cameras
      // share the grain, aberration, vignette and drowsy warp; the cameras add a
      // cheap old CCTV: low resolution, tracking wobble, a rolling band, washed
      // out dingy colour, and darkness unless you light it.
      fragShader: arcadeData.shader,
    });
  }
  onPreRender() {
    const f = FX || {};
    this.set1f('uT', (f.t || 0) % 1000);
    for (const k of ['nv', 'no', 'ab', 'dk', 'wp', 'lit', 'amb', 'of']) this.set1f('u' + k, f[k] || 0);
  }
}

new Phaser.Game({
  type: Phaser.AUTO, width: W, height: H, parent: 'game-root', backgroundColor: '#000000', pixelArt: true,
  scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH, width: W, height: H },
  pipeline: { Horror: HorrorPipeline },
  scene: { create, update },
});

// =====================================================================
// TEXTURE GENERATION
// =====================================================================
function canvasTex(key, w, h, draw) { const t = S.textures.createCanvas(key, w, h); draw(t.getContext()); t.refresh(); }
const spriteTex = (key, rows) => canvasTex(key, rows[0].length, rows.length, (c) => rows[KEY_FOR_EACH]((row, y) => row[KEY_FOR_EACH]((ch, x) => {
  const color = P_PAL[ch.charCodeAt(0) - 65]; // The palette starts at ASCII A.
  if (color != null) { c[DRAW_FILL_STYLE] = color; c[DRAW_FILL_RECT](x, y, 1, 1); }
})));
function buildSprites() {
  for (const role in SPR) {
    const rows = parseCSEF(SPR[role]);
    spriteTex(role + '0', rows);
    if (role == 'chef') continue;
    let top = 0; while (rows[top].every((c) => c == '.')) top++;
    spriteTex(role + 'H', rows.slice(top, top + 14)); // the face in CCTV hallucinations
  }
}
// The banana. Not the inflatable one from the lobby. You only see it when you fall asleep.
function bananaTex() {
  canvasTex('banana0', 24, 24, (c) => {
    const px = (col, x, y, w = 1, h = 1) => { c[DRAW_FILL_STYLE] = col; c[DRAW_FILL_RECT](x, y, w, h); };
    for (let y = 1; y < 21; y++) {
      const t = (y - 1) / 19, cx = 13 - 4 * M.sin(PI * t), hw = M.round(1 + 4 * M.sin(PI * t) ** 0.6), a = M.round(cx - hw), b = M.round(cx + hw);
      px('#f2c418', a, y, b - a + 1); px('#fde68a', a, y); px('#b8860b', b - 1, y, 2);
      if (y > 14) px('#7a5a10', a + 1, y); // bruises
    }
    px('#5a3a10', 13, 0, 2); px('#3a2408', 12, 20, 3);
    for (const [x, y] of [[3, 12], [2, 13], [2, 14], [1, 15], [15, 12], [16, 13], [16, 14], [17, 15], [11, 21], [11, 22], [10, 23], [14, 21], [14, 22], [15, 23]]) px('#2a1a08', x, y); // stick arms and legs
    px(COLOR_000, 7, 6, 2, 2); px(COLOR_000, 11, 6, 2, 2); px(COLOR_FFF, 8, 6); px(COLOR_FFF, 11, 6); // hollow eyes, pinpoint pupils
    px(COLOR_000, 5, 9); px(COLOR_000, 13, 9); px(COLOR_000, 6, 10, 7, 2); // a grin that is too wide
    for (const x of [6, 8, 10, 12]) px('#e8e8d8', x, 10);
  });
}
function buildFxTex() {
  bananaTex();
  const pix = (key, w, h, f) => canvasTex(key, w, h, (c) => {
    const img = c.createImageData(w, h);
    for (let i = 0; i < w * h; i++) { const v = f(i % w, (i / w) | 0); img.data.set([v[0], v[0], v[0], v[1]], i * 4); }
    c.putImageData(img, 0, 0);
  });
  pix('cone', 256, 160, (x, y) => {
    const dy = y - 80, d = M.hypot(x, dy), a = M.abs(M.atan2(dy, x + 0.001));
    let v = a < 0.42 && d < 256 ? M.max(0, (1 - (a / 0.42) ** 3) * (1 - (d / 256) ** 2.2)) : 0;
    if (d < 16) v = M.max(v, 0.7 * (1 - d / 16));
    return [255, v * 255];
  });
  pix('noise', 200, 150, () => [M[KEY_RANDOM]() * 255, 255]);
  // Only the middle of the portrait catches light. Fade its lower edge into black.
  canvasTex('lossShade', W, H, (c) => {
    const halo = c.createRadialGradient(W / 2, 400, 25, W / 2, 400, 270);
    halo[DRAW_ADD_COLOR_STOP](0, 'rgba(0,0,0,.45)');
    halo[DRAW_ADD_COLOR_STOP](0.55, 'rgba(0,0,0,.64)');
    halo[DRAW_ADD_COLOR_STOP](1, '#000');
    c[DRAW_FILL_STYLE] = halo;
    c[DRAW_FILL_RECT](0, 0, W, H);
    const fade = c.createLinearGradient(0, 469, 0, H);
    fade[DRAW_ADD_COLOR_STOP](0, 'rgba(0,0,0,0)');
    fade[DRAW_ADD_COLOR_STOP](1, '#000');
    c[DRAW_FILL_STYLE] = fade;
    c[DRAW_FILL_RECT](0, 469, W, H - 469);
  });
}

// ---- Camera shots: every room is a small 3D box seen from its own camera
// (corners, hallways, a close-up of the team). setCam() picks the camera,
// P() projects a world point to [screen x, screen y, scale] in the 1000px shot.
const CAMW = 1000, WH = 240, NEAR = 8;
let CAM;
function setCam([x, y, z, tx, ty, tz, f]) {
  const a = M.atan2(tx - x, -(ty - y)), b = M.atan2(z - tz, M.hypot(tx - x, ty - y));
  CAM = [x, y, z, M.sin(a), -M.cos(a), M.cos(b), M.sin(b), f];
}
// world -> camera space [right, up, depth]
function cs(x, y, z) {
  const [cx, cy, cz, fx, fy, cb, sb] = CAM, dx = x - cx, dy = y - cy, D = dx * fx + dy * fy, Y = z - cz;
  return [dx * -fy + dy * fx, D * sb + Y * cb, D * cb - Y * sb];
}
const scr = (q) => [CAMW / 2 + CAM[7] * q[0] / q[2], H / 2 - CAM[7] * q[1] / q[2], CAM[7] / q[2]];
const P = (x, y, z) => { const q = cs(x, y, z || 0); return q[2] > NEAR ? scr(q) : null; };
// a flat polygon in the world, clipped at the camera and darker with distance
function poly(c, col, pts) {
  const Q = pts.map((p) => cs(...p)), o = [];
  Q[KEY_FOR_EACH]((a, i) => {
    const b = Q[(i + 1) % Q.length];
    if (a[2] >= NEAR) o[KEY_PUSH](a);
    if ((a[2] >= NEAR) != (b[2] >= NEAR)) { const t = (NEAR - a[2]) / (b[2] - a[2]); o[KEY_PUSH](a.map((v, k) => v + (b[k] - v) * t)); }
  });
  if (o.length < 3) return;
  c[DRAW_BEGIN_PATH](); o[KEY_FOR_EACH]((q, i) => { const [sx, sy] = scr(q); i ? c.lineTo(sx, sy) : c.moveTo(sx, sy); });
  c[DRAW_FILL_STYLE] = col; c.fill();
  c[DRAW_FILL_STYLE] = 'rgba(0,0,0,' + M.min(0.8, o.reduce((s, q) => s + q[2], 0) / o.length / 2200) + ')'; c.fill();
}
// a box on the floor: [x, y, w, d, h, front, top, side, z0]; only the faces you can see
function box(c, [x, y, w, d, h, fr, tp, sd, z0 = 0]) {
  const [cx, cy, cz] = CAM, x2 = x + w, y2 = y + d, z2 = z0 + h;
  if (cz > z2) poly(c, tp, [[x, y, z2], [x2, y, z2], [x2, y2, z2], [x, y2, z2]]);
  if (cy < y) poly(c, fr, [[x, y, z0], [x2, y, z0], [x2, y, z2], [x, y, z2]]);
  if (cy > y2) poly(c, fr, [[x, y2, z0], [x2, y2, z0], [x2, y2, z2], [x, y2, z2]]);
  if (cx < x) poly(c, sd, [[x, y, z0], [x, y2, z0], [x, y2, z2], [x, y, z2]]);
  if (cx > x2) poly(c, sd, [[x2, y, z0], [x2, y2, z0], [x2, y2, z2], [x2, y, z2]]);
}
// draw boxes far to near
const boxes = (c, L) => L.map((b) => [b, -cs(b[0] + b[2] / 2, b[1] + b[3] / 2, 0)[2]]).sort((a, b) => a[1] - b[1])[KEY_FOR_EACH]((b) => box(c, b[0]));
// a rectangle on a wall: wall side, from offset a to b, heights z0..z1
function wq(R, s, a, b, z0, z1) {
  const w = R[2], d = R[3], p = (o, z) => (s == 'N' ? [o, 0, z] : s == 'S' ? [o, d, z] : s == 'W' ? [0, o, z] : [w, o, z]);
  return [p(a, z0), p(b, z0), p(b, z1), p(a, z1)];
}
function wtext(c, R, s, o, z, str, size, col) {
  const q = P(...wq(R, s, o, o, z, z)[0]);
  if (!q) return;
  c[DRAW_FILL_STYLE] = col; c.font = 'bold ' + ((size * q[2]) | 0) + 'px monospace'; c.textAlign = TEXT_CENTER; c.fillText(str, q[0], q[1]);
}
function shell(c, R) {
  const [, , w, d, , fA, fB, wall, t] = R;
  c[DRAW_FILL_STYLE] = '#050506'; c[DRAW_FILL_RECT](0, 0, CAMW, H);
  poly(c, '#0d0d10', [[0, 0, WH], [w, 0, WH], [w, d, WH], [0, d, WH]]); // ceiling
  for (let y = 0; y < d; y += t) for (let x = 0; x < w; x += t) poly(c, ((x + y) / t) % 2 ? fA : fB, [[x, y, 0], [M.min(w, x + t), y, 0], [M.min(w, x + t), M.min(d, y + t), 0], [x, M.min(d, y + t), 0]]);
  for (const [s, L] of [['N', w], ['S', w], ['W', d], ['E', d]]) {
    poly(c, wall, wq(R, s, 0, L, 0, WH));
    if (s > 'N') poly(c, 'rgba(0,0,0,.3)', wq(R, s, 0, L, 0, WH)); // side walls a bit darker
    poly(c, 'rgba(255,255,255,.07)', wq(R, s, 0, L, 18, 24)); // baseboard
  }
  for (const [to, s, o] of R[10]) {
    poly(c, '#030303', wq(R, s, o - 50, o + 50, 0, 165)); // doorway
    poly(c, to == CTRL ? '#a22' : '#0c6', wq(R, s, o - 22, o + 22, 178, 196)); // exit sign (red: your office)
  }
}
// Room art is a list of operations in draw order for each camera.
const ROOM_ART = arcadeData.roomArt;
// things in front of the people standing in a room (drawn over them)
const FG = { 0: (c) => boxes(c, [[60, 240, 580, 60, 78, '#6d5a42', '#8c7558', '#4d3a22'], ...Object.values(SEATS).map((x) => [x - 38, 250, 76, 5, 26, '#9aa', '#bcc', '#788', 78])]) };
function buildRooms() {
  ROOMS[KEY_FOR_EACH]((R, r) => {
    setCam(R[9]);
    canvasTex('room' + r, CAMW, H, (c) => { shell(c, R);
      // Operations carry the original arguments. Text also needs the room.
      for (const [op, ...args] of ROOM_ART[r]) {
        if (op === 0) poly(c, ...args);
        else if (op === 1) boxes(c, ...args);
        else wtext(c, R, ...args);
      } });
    if (FG[r]) canvasTex('room' + r + 'f', CAMW, H, FG[r]);
  });
}

// ---- The security office (first person, FNAF-style) ----
// A cramped security booth, 1200 px around (you turn half a screen each way):
// the back wall with the dark front hallway in the middle, a side wall on each
// side with a heavy steel shutter door, hazard stripes and its button panel,
// a low ceiling with one lamp hanging over the desk. Three layers: the room;
// the same room with the doorways cut out, drawn OVER whoever stands in a
// doorway (the frame hides them, so they can peek around it); and the desk,
// which slides a little faster than the room when you turn (parallax). The
// post shader bends it all like a cylinder: turning your head, not scrolling.
const PW = 1200, PCX = 600, LW = 250, RW = 950, TOPY = 80, FLY = 470;
// the ceiling and floor lines along the walls (side walls are in perspective)
const wTop = (x) => (x < LW ? (TOPY * x) / LW : x > RW ? (TOPY * (PW - x)) / (PW - RW) : TOPY);
const wBot = (x) => (x < LW ? H - ((H - FLY) * x) / LW : x > RW ? H - ((H - FLY) * (PW - x)) / (PW - RW) : FLY);
const DX = { W: [40, 200], E: [1000, 1160] };
// a doorway as 4 points; k < 1 cuts it at that height (how far the shutter is down)
function dq(d, k = 1) {
  if (d == 'N') return [[520, 150], [680, 150], [680, 150 + 320 * k], [520, 150 + 320 * k]];
  const [a, b] = DX[d], t = (x) => wTop(x) + (wBot(x) - wTop(x)) * 0.14, f = (x) => wBot(x) - 6;
  return [[a, t(a)], [b, t(b)], [b, lerp(t(b), f(b), k)], [a, lerp(t(a), f(a), k)]];
}
const ODOOR = { W: [40, 100, 160, 470], N: [520, 150, 160, 320], E: [1000, 100, 160, 470] }; // bounding boxes
const OPANEL = { W: [206, 236], N: [692, 250], E: [954, 236] };
// where each thing is across the room (focus = the nearest one to where you look)
// Pan stops are measured in office pixels. The counter spans the right-center bay.
const COFFEE_START = 219, COFFEE_END = 349;
const COFFEE_X = 765, BREW = 5, SIP = 1.8, FAN = [470, 384], CLOCK = [770, 152], DESK_PX = 0.14, CRT_X = 300;
function buildOffice() {
  // These drawing helpers run once to bake the office textures. Keeping them
  // local lets SWC reuse shorter names without touching the live renderer.
  function quad(c, col, pts) { c[DRAW_FILL_STYLE] = col; c[DRAW_BEGIN_PATH](); pts[KEY_FOR_EACH]((p, i) => (i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]))); c.fill(); }
  // small canvas helpers
  const cR = (c, col, x, y, w, h) => { c[DRAW_FILL_STYLE] = col; c[DRAW_FILL_RECT](x, y, w, h); };
  const cT = (c, col, sz, s, x, y) => { c[DRAW_FILL_STYLE] = col; c.font = 'bold ' + sz + 'px monospace'; c.textAlign = TEXT_CENTER; c.fillText(s, x, y); };
  const cL = (c, col, w, pts, open) => { c.strokeStyle = col; c.lineWidth = w; c[DRAW_BEGIN_PATH](); pts[KEY_FOR_EACH]((p, i) => (i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1]))); if (!open) c.closePath(); c.stroke(); };
  const cG = (c, x0, y0, x1, y1, a, b) => { const g = c.createLinearGradient(x0, y0, x1, y1); g[DRAW_ADD_COLOR_STOP](0, a); g[DRAW_ADD_COLOR_STOP](1, b); return g; };
  const cRad = (c, x, y, r, a, b) => { const g = c.createRadialGradient(x, y, 0, x, y, r); g[DRAW_ADD_COLOR_STOP](0, a); g[DRAW_ADD_COLOR_STOP](1, b); return g; };
  function drawRoom(c, holes) {
    // ---- ceiling: the lamp's cord and shade
    quad(c, '#08090b', [[0, 0], [PW, 0], [RW, TOPY], [LW, TOPY]]);
    cL(c, '#0d0d0f', 3, [[PCX, 0], [PCX, 28]], 1);
    quad(c, '#2d2f35', [[PCX - 38, 50], [PCX + 38, 50], [PCX + 18, 28], [PCX - 18, 28]]); quad(c, '#3a3d44', [[PCX - 38, 50], [PCX + 38, 50], [PCX + 34, 46], [PCX - 34, 46]]);
    // ---- walls: the back wall, then the side walls (darker towards you)
    quad(c, cG(c, 0, TOPY, 0, FLY, '#1a1c21', '#2e3238'), [[LW, TOPY], [RW, TOPY], [RW, FLY], [LW, FLY]]);
    quad(c, cG(c, 0, 0, LW, 0, '#0c0d10', '#24272c'), [[0, 0], [LW, TOPY], [LW, FLY], [0, H]]);
    quad(c, cG(c, PW, 0, RW, 0, '#0c0d10', '#24272c'), [[PW, 0], [RW, TOPY], [RW, FLY], [PW, H]]);
    cL(c, '#0d0e11', 4, [[LW, TOPY], [LW, FLY]], 1); cL(c, '#0d0e11', 4, [[RW, TOPY], [RW, FLY]], 1); // the corners
    // lower wall: small square tiles under a black-and-white checker stripe
    const band = (k) => (x) => wTop(x) + (wBot(x) - wTop(x)) * k;
    for (let x = 0; x < PW; x += 12) for (let r = 0; r < 2; r++) {
      const a = band(0.6 + r * 0.035), b = band(0.635 + r * 0.035);
      quad(c, ((x / 12) + r) % 2 ? '#c9c9bf' : '#121212', [[x, a(x)], [x + 12, a(x + 12)], [x + 12, b(x + 12)], [x, b(x)]]);
    }
    for (const [x0, x1] of [[0, LW], [LW, RW], [RW, PW]]) quad(c, 'rgba(10,12,14,.35)', [[x0, band(0.67)(x0)], [x1, band(0.67)(x1)], [x1, wBot(x1)], [x0, wBot(x0)]]);
    for (let x = LW; x < RW; x += 22) cL(c, COLOR_RGBA_0_0_0_25, 1, [[x, band(0.67)(x)], [x, FLY]], 1);
    for (let k = 0.7; k < 1; k += 0.06) cL(c, COLOR_RGBA_0_0_0_25, 1, [[0, band(k)(0)], [LW, band(k)(LW)], [RW, band(k)(RW)], [PW, band(k)(PW)]], 1);
    // ---- floor: checker tiles converging to the back
    c.save(); c[DRAW_BEGIN_PATH](); [[LW, FLY], [RW, FLY], [PW, H], [0, H]][KEY_FOR_EACH]((p, i) => (i ? c.lineTo(...p) : c.moveTo(...p))); c.clip();
    for (let row = 0; row < 6; row++) {
      const y0 = FLY + row * row * 4 + row * 10, y1 = FLY + (row + 1) * (row + 1) * 4 + (row + 1) * 10, s0 = 1 + row * 0.4, s1 = s0 + 0.4;
      for (let col = -30; col < 30; col++) quad(c, (row + col) % 2 ? '#1d1d1f' : '#0a0a0b', [[PCX + col * 44 * s0, y0], [PCX + (col + 1) * 44 * s0, y0], [PCX + (col + 1) * 44 * s1, y1], [PCX + col * 44 * s1, y1]]);
    }
    c.restore();
    // ---- the wall clock face
    c[DRAW_FILL_STYLE] = '#0e0e10'; c[DRAW_BEGIN_PATH](); c.arc(...CLOCK, 38, 0, PI * 2); c.fill();
    c[DRAW_FILL_STYLE] = '#d2cec0'; c[DRAW_BEGIN_PATH](); c.arc(...CLOCK, 32, 0, PI * 2); c.fill();
    for (let i = 0; i < 12; i++) { const a = (i / 12) * PI * 2; cL(c, '#222', i % 3 ? 2 : 4, [[CLOCK[0] + M.cos(a) * 25, CLOCK[1] + M.sin(a) * 25], [CLOCK[0] + M.cos(a) * 30, CLOCK[1] + M.sin(a) * 30]], 1); }
    // ---- light: the lamp's warm pool in the middle, darkness towards the doors
    c[DRAW_FILL_STYLE] = cRad(c, PCX, 330, 560, 'rgba(255,205,130,.13)', 'rgba(255,205,130,0)'); c[DRAW_FILL_RECT](0, 0, PW, H);
    c[DRAW_FILL_STYLE] = cRad(c, PCX, 52, 90, 'rgba(255,225,170,.35)', 'rgba(255,225,170,0)'); c[DRAW_FILL_RECT](PCX - 90, 0, 180, 140);
    cR(c, cG(c, 0, 0, 330, 0, COLOR_RGBA_0_0_0_55, 'rgba(0,0,0,0)'), 0, 0, 330, H); cR(c, cG(c, PW, 0, PW - 330, 0, COLOR_RGBA_0_0_0_55, 'rgba(0,0,0,0)'), PW - 330, 0, 330, H);
    // ---- the openings: dark hallway and doorways (or holes, for the wall layer)
    if (!holes) {
      quad(c, COLOR_000, dq('N'));
      for (const d of SIDES) quad(c, COLOR_000, dq(d));
    } else {
      c[DRAW_GLOBAL_COMPOSITE_OPERATION] = 'destination-out';
      for (const d of ADOOR) quad(c, COLOR_000, dq(d));
      c[DRAW_GLOBAL_COMPOSITE_OPERATION] = 'source-over';
    }
    // Recess the rolling shutters into narrow channels in the side walls.
    for (const d of SIDES) {
      const [a,b,c1,d1] = dq(d);
      quad(c, '#191c20', [a,b,[b[0],b[1]+9],[a[0],a[1]+9]]);
      for (const [top,bottom,offset] of [[a,d1,5],[b,c1,-5]]) {
        quad(c, '#37393a', [top,[top[0]+offset,top[1]+3],[bottom[0]+offset,bottom[1]-3],bottom]);
      }
    }
    cR(c, '#0a5', 82, 46, 76, 18); cT(c, COLOR_000, 11, 'ESQUINA O.', 120, 60);
    cR(c, '#0a5', 1042, 46, 76, 18); cT(c, COLOR_000, 11, 'ESQUINA E.', 1080, 60);
    cR(c, '#e6c21a', 500, 104, 200, 32); cT(c, COLOR_000, 17, TEXT_PLATANUS_HACK_26, 600, 126);
    // the button plates (the buttons themselves light up live)
    for (const d of ADOOR) { const [px, py] = OPANEL[d], h = d == 'N' ? 60 : 110; cR(c, '#121316', px - 6, py - 6, 52, h + 12); cR(c, '#474b53', px, py, 40, h); cR(c, '#5d626b', px, py, 40, 3); }
  }
  // The desk has its own parallax layer with the CRT, fan, keyboard, phone and coffee maker.
  function drawDesk(c) {
    quad(c, '#3d3024', [[300, 440], [900, 440], [990, 540], [210, 540]]);
    for (const t of [0.18, 0.4, 0.62, 0.84]) cL(c, 'rgba(0,0,0,.2)', 2, [[lerp(300, 210, t), 440 + 100 * t], [lerp(900, 990, t), 440 + 100 * t]], 1);
    cR(c, '#5a4634', 300, 438, 600, 4);
    cR(c, cG(c, 0, 540, 0, H, '#2b2119', '#0c0907'), 210, 540, 780, H - 540); cR(c, '#4c3b2c', 210, 538, 780, 4);
    // The CRT occupies the left side of the desk.
    quad(c, '#16171a', [[CRT_X + 16, 346], [CRT_X + 112, 346], [CRT_X + 102, 328], [CRT_X + 26, 328]]);
    cR(c, '#1d1e22', CRT_X, 346, 128, 94); cR(c, '#2a2c31', CRT_X, 346, 128, 4);
    cR(c, '#0b1014', CRT_X + 10, 356, 108, 70); cR(c, '#131a20', CRT_X + 10, 356, 108, 3);
    cR(c, '#3c2', CRT_X + 114, 430, 5, 4); cR(c, '#121214', CRT_X + 40, 440, 48, 6);
    // the keyboard and red phone
    quad(c, '#18181a', [[520, 470], [680, 470], [688, 500], [512, 500]]);
    for (let i = 0; i < 28; i++) cR(c, '#2e2e31', 522 + (i % 14) * 11.2, 474 + (i > 13) * 12, 9, 9);
    cR(c, '#5e0a0a', 238, 488, 110, 34); cR(c, '#8e1414', 248, 472, 90, 22); cR(c, '#7a1010', 234, 464, 118, 12);
    c[DRAW_FILL_STYLE] = '#e6dcc4'; c[DRAW_BEGIN_PATH](); c.arc(293, 502, 12, 0, PI * 2); c.fill();
    // the coffee maker and the fan stand
    cR(c, '#1a1a1a', COFFEE_X - 30, 400, 60, 72); cR(c, '#333', COFFEE_X - 24, 408, 48, 20); cR(c, '#111', COFFEE_X - 14, 440, 28, 6); cT(c, COLOR_FFF, 9, 'CAFÉ', COFFEE_X, 422);
    cR(c, '#2a2a2a', FAN[0] - 5, FAN[1] + 30, 10, 42); cR(c, '#222', FAN[0] - 30, FAN[1] + 68, 60, 9);
  }
  // Each aperture is a window onto the building. The side entrances look
  // across a corridor at the opposite wall. The center looks along its length.
  function drawPassage(c, door) {
    const front = door == 'N';
    c[DRAW_FILL_STYLE] = front ? '#151a1c' : '#202527';
    c[DRAW_FILL_RECT](0, 0, 160, H);
    c.save();
    if (door == 'E') { c.translate(160, 0); c.scale(-1, 1); }
    if (front) {
      quad(c, cG(c,0,0,70,0,'#707774','#353c3e'), [[0,120],[63,255],[63,336],[0,480]]);
      quad(c, cG(c,90,0,160,0,'#343936','#63635b'), [[98,254],[160,128],[160,480],[98,336]]);
      quad(c, cG(c,0,336,0,470,'#383c38','#827b6d'), [[63,336],[98,336],[160,480],[0,480]]);
      cR(c,'#273438',63,255,35,81);
      cR(c,'#101818',78,279,20,57);
      cR(c,'#598571',79,269,15,5);
      quad(c,'#414f4d',[[0,306],[63,302],[63,306],[0,320]]);
      quad(c,'#353e3c',[[98,304],[160,312],[160,322],[98,308]]);
    } else {
      // Elevation of the far wall, with its skirting and fixtures on one plane.
      c.save(); c.transform(1,-.12,0,1,0,15);
      cR(c,cG(c,0,130,0,440,'#737775','#b1afa0'),-10,100,190,330);
      cR(c,'#536865',-10,304,190,118);
      cR(c,'#353c37',-10,413,190,10);
      cR(c,'#474e4d',85,191,76,231);
      cR(c,cG(c,0,423,0,550,'#797b71','#444842'),-10,423,190,180);
      quad(c,'#515751',[[0,423],[160,423],[160,426],[0,432]]);
      c.restore();
      // The return wall at the bend obscures a sliver of the far corridor.
      quad(c,cG(c,0,0,22,0,'#2f3635','#575e57'),[[0,90],[23,117],[23,436],[0,463]]);
    }
    c.restore();
    c[DRAW_FILL_STYLE]=cRad(c,79,302,245,'rgba(16,14,10,0)','rgba(6,9,11,.82)');
    c[DRAW_FILL_RECT](0,0,160,H);
  }

  canvasTex(STATE_OFFICE, PW, H, (c) => drawRoom(c, 0));
  canvasTex('officeM', PW, H, (c) => drawRoom(c, 1));
  canvasTex('desk', PW, H, drawDesk);
  for (const d of ADOOR) canvasTex('passage' + d,160,H,c => drawPassage(c,d));
}

// =====================================================================
// CREATE
// =====================================================================
let wC, rC, oC, uC, uiCam;
let bgImg, fgImg, dynG, emG, projTxt, askG, askTxt, lensImg, oBg, oG, oBeam, oDim, oLamp, oTop, oMask, oDesk, deskImg, oDG, fanS = 0, fanA = 0;
const eImg = {}, oImg = {};
// UI objects (u*) live in the uC layer, which the post-FX camera ignores
let uC1, uC2, uCallName, uCallTxt, uHandset, uCallHint, uCam, uCamBar, uCardN, uG, uHour, uHud, uLid, uLid2, uMapT, uMsg, uMug, uNight, uPPress, uPaperEnd, uPow, uPr, uScr, uScrT, uScreen, uStat, uSue, uT1, uTNew, uTMenu, uTab, uTh, uTitleBan, uTitleStat, uW1, uW2, uWDone, uWarn;
let zR, zO, uZ, oBan, dozeHB, litA = 0, scrSide, scrPre; // the sleeper's z's (or !! when angry) · falling asleep
let uLearn, uPauseHint;
const TS = (sz, col, extra) => Object[KEY_ASSIGN]({ fontFamily: 'monospace', fontSize: sz + 'px', color: col || COLOR_FFF, fontStyle: 'bold' }, extra);
const add = (c, o) => { c.add(o); return o; };
const img = (c, k, x, y, ox, oy) => add(c, S.add.image(x, y, k)[DRAW_SET_ORIGIN](ox ?? 0.5, oy ?? 0.5));
const txt = (c, x, y, s, sz, col, ox, oy, extra) => add(c, S.add.text(x, y, s, TS(sz, col, extra))[DRAW_SET_ORIGIN](ox ?? 0.5, oy ?? 0.5));

function create() {
  S = this;
  buildSprites(); buildFxTex(); buildRooms(); buildOffice();
  const act = (e) => KEY2ACT[e.key.length == 1 ? e.key[KEY_TO_LOWER_CASE]() : e.key];
  addEventListener('keydown', (e) => { const a = act(e); initAudio(); if (a) { if (!held[a]) pressed[a] = 1; held[a] = 1; } });
  addEventListener('keyup', (e) => {
    const a = act(e);
    if (a) held[a] = 0;
    if (a == '1') ignoreMenuB1 = false;
  });

  wC = S.add[DRAW_CONTAINER](); rC = add(wC, S.add[DRAW_CONTAINER]()); oC = add(wC, S.add[DRAW_CONTAINER]()); uC = S.add[DRAW_CONTAINER]();
  // camera feed
  bgImg = img(rC, 'room0', 0, 0, 0, 0);
  fgImg = img(rC, 'room0f', 0, 0, 0, 0);
  dynG = add(rC, S.add[DRAW_GRAPHICS]());
  projTxt = txt(rC, 0, 0, '', 18, '#111');
  for (const r in SPR) eImg[r] = img(rC, r + '0', 0, 0, 0.5, 1);
  lensImg = img(rC, 'mentora0', 0, 0, 0.5, 0.2)[DRAW_SET_VISIBLE](false);
  emG = add(rC, S.add[DRAW_GRAPHICS]());
  askG = add(rC, S.add[DRAW_GRAPHICS]());
  askTxt = txt(rC, 0, 0, '', 15, '#111')[DRAW_SET_VISIBLE](false);
  zR = txt(rC, 0, 0, '', 16);
  // office, back to front: the room, light in the doorways, whoever stands in
  // them, the walls (over them), the lamp, the darkness, the light beam, shutters
  // and buttons, the desk (its own parallax layer), and what stands before you
  oBg = img(oC, STATE_OFFICE, 0, 0, 0, 0);
  oG = img(oC, 'passageN', 520, 0, 0, 0)[DRAW_SET_VISIBLE](false);
  for (const r of ROLES) oImg[r] = img(oC, r + '0', 0, 0, 0.5, 1);
  oMask = img(oC, 'officeM', 0, 0, 0, 0);
  oLamp = img(oC, 'cone', PCX, 40, 0, 0.5)[DRAW_SET_BLEND_MODE](1)[DRAW_SET_TINT](0xffe2a0)[DRAW_SET_SCALE](1.9, 2.6);
  oDim = add(oC, S.add[DRAW_GRAPHICS]());
  oBeam = img(oC, 'cone', 0, 0, 0, 0.5)[DRAW_SET_BLEND_MODE](1)[DRAW_SET_TINT](0xfff0c0)[DRAW_SET_VISIBLE](false);
  oTop = add(oC, S.add[DRAW_GRAPHICS]());
  zO = txt(oC, 0, 0, '', 22);
  oDesk = add(oC, S.add[DRAW_CONTAINER]()); deskImg = img(oDesk, 'desk', 0, 0, 0, 0); oDG = add(oDesk, S.add[DRAW_GRAPHICS]());
  oBan = img(oC, 'banana0', 0, 0, 0.5, 1)[DRAW_SET_VISIBLE](false);

  buildUI();
  const mc = S[KEY_CAMERAS].main;
  uiCam = S[KEY_CAMERAS].add(0, 0, W, H);
  mc.ignore(uC); uiCam.ignore(wC);
  if (S.game.renderer.type == Phaser.WEBGL) { mc.setPostPipeline('Horror'); FX = { t: 0 }; }
  goTitle();
  saveWrites = loadSave();
}

// =====================================================================
// UI
// =====================================================================
const CAMERA_SELECTED_COLOR = 0x789936;
const CAMERA_SELECTED_TEXT = '#' + CAMERA_SELECTED_COLOR.toString(16);
const HUD_INSET = 34, HUD_BATTERY_Y = H - 96;
function buildUI() {
  const h = (uHud = add(uC, S.add[DRAW_CONTAINER]()));
  const T = (x, y, s, sz, col, ox, oy, extra) => txt(h, x, y, s, sz, col, ox, oy, extra);
  const rect = (x, y, w, hh, col, a) => add(h, S.add[DRAW_RECTANGLE](x, y, w, hh, col, a ?? 1)[DRAW_SET_ORIGIN](0));
  uLid = rect(0, 0, W, 0, 0); uLid2 = rect(0, H, W, 0, 0); // eyelids: over the scene, under the UI
  uG = add(h, S.add[DRAW_GRAPHICS]());
  uStat = add(h, S.add[KEY_TILE_SPRITE](0, 0, W, H, 'noise')[DRAW_SET_ORIGIN](0)[DRAW_SET_ALPHA](0));
  uTab = add(h, S.add[DRAW_CONTAINER]());
  const bezel = add(uTab, S.add[DRAW_GRAPHICS]());
  bezel[DRAW_FILL_STYLE](0x101317)[DRAW_FILL_ROUNDED_RECT](-420, 0, 840, 650, 25)
    [DRAW_LINE_STYLE](5, 0x707981).strokeRoundedRect(-415, 3, 830, 637, 22)
    [DRAW_FILL_STYLE](0x26333a)[DRAW_FILL_ROUNDED_RECT](-385, 32, 770, 548, 12)
    [DRAW_FILL_STYLE](0x0b1116)[DRAW_FILL_RECT](-375, 41, 750, 528)
    [DRAW_FILL_STYLE](0x87a391)[DRAW_FILL_CIRCLE](338, 18, 3);
  for (let y = 45; y < 565; y += 7) bezel[DRAW_LINE_STYLE](1, 0x263038)[DRAW_LINE_BETWEEN](-375, y, 375, y);
  txt(uTab, -315, 17, 'SEGURIDAD   /   CCTV', 11, '#94a399');
  // FNAF corners: the time top right, power and usage bottom left
  uHour = T(W - HUD_INSET, 24, '', 30, COLOR_FFF, 1, 0);
  uNight = T(W - HUD_INSET, 60, '', 14, '#aab', 1, 0);
  uPauseHint = T(W - HUD_INSET, 82, 'START · PAUSA', 11, '#bbb1bd', 1, 0);
  uSue = T(HUD_INSET, HUD_BATTERY_Y - 38, '', 12, COLOR_C9B6FF, 0, 0);
  uPow = T(HUD_INSET, HUD_BATTERY_Y, '', 16, COLOR_FFF, 0, 0);
  uCam = [T(40, 34, '', 20, '#e8e0d0', 0, 0), T(40, 82, '● REC', 14, '#ff4444', 0, 0), T(40, 60, '', 13, '#b8b0a0', 0, 0), T(560, 568, 'STICK: CÁMARA · B1: LINTERNA · B4: ANTERIOR · B3: BAJAR', 10, '#b8b0a0')];
  uMapT = [...ROOMS.map((R) => R[1]), 'TÚ'].map((s) => T(0, 0, s, 9, '#d8d0c0'));
  uPr = [0, 1, 2, 3].map(() => T(0, 0, '', 13, COLOR_FFF, 0.5, 0.5, { backgroundColor: '#000000cc', padding: { x: 6, y: 3 }, align: TEXT_CENTER, wordWrap: { width: 550 } }));
  uLearn = T(W / 2, 44, '', 16, '#fff0ac', 0.5, 0.5, {
    backgroundColor: '#2b200ee6', padding: { x: 12, y: 6 }, stroke: '#100a05', strokeThickness: 2
  })[DRAW_SET_VISIBLE](false);
  uCamBar = T(400, 580, 'B3 · CÁMARAS', 14, '#e8e0d0', 0.5, 0.5, { backgroundColor: '#2a2620cc', padding: { x: 60, y: 4 } });
  uWarn = T(560, 580, '⚠', 34, COLOR_FFD400); // FNAF2-style warning next to the camera bar
  uMsg = T(400, 140, '', 22, COLOR_FFF, 0.5, 0.5, { stroke: COLOR_000, strokeThickness: 5, align: TEXT_CENTER });
  uZ = T(400, 300, '', 40, COLOR_C9B6FF);
  uTh = T(400, 530, '', 14, '#d6d2c6', 0.5, 1, { stroke: '#101012', strokeThickness: 3, wordWrap: { width: 420 }, align: TEXT_CENTER, fontStyle: 'italic' });
  // drinking: a big mug rises in front of your face
  uMug = add(h, S.add[DRAW_CONTAINER](400, H + 200));
  const m = add(uMug, S.add[DRAW_GRAPHICS]());
  m[DRAW_FILL_STYLE](0xe8e2c8)[DRAW_FILL_ROUNDED_RECT](-110, -130, 220, 260, 24)[DRAW_LINE_STYLE](26, 0xe8e2c8)[DRAW_STROKE_CIRCLE](130, 0, 60)[DRAW_FILL_STYLE](0x5a3416).fillEllipse(0, -120, 190, 34)[DRAW_FILL_STYLE](0xc0392b)[DRAW_FILL_RECT](-110, -20, 220, 40);
  txt(uMug, 0, 0, 'PLATANUS', 22);
  uScr = img(uC, 'pitcher0', 400, 330, 0.5, 0.3)[DRAW_SET_VISIBLE](false);
  uScrT = txt(uC, 400, 520, '', 40, COLOR_FFF, 0.5, 0.5, { stroke: COLOR_000, strokeThickness: 8 });
  uScreen = add(uC, S.add[DRAW_CONTAINER]());
}
const clearScreen = () => uScreen.removeAll(true);
const sAdd = (o, c) => add(c || uScreen, o);
const sText = (x, y, s, sz, col, ox, oy, extra, c) => txt(c || uScreen, x, y, s, sz, col, ox, oy, extra);
const sRect = (col) => sAdd(S.add[DRAW_RECTANGLE](0, 0, W, H, col)[DRAW_SET_ORIGIN](0));

// =====================================================================
// SAVE
// =====================================================================
let saveWrites = Promise.resolve();
function storage() {
  return window.platanusArcadeStorage || {
    async get(k) { try { const v = localStorage.getItem(k); return v == null ? { found: false } : { found: true, value: JSON.parse(v) }; } catch (e) { return { found: false }; } },
    async set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { } },
  };
}
async function loadSave() {
  try {
    const r = await storage().get(SAVE_KEY);
    if (r && r.found && r[AUDIO_VALUE] && typeof r[AUDIO_VALUE].night == 'number') {
      saved.night = menuNight = M.max(saved.night, clamp(r[AUDIO_VALUE].night | 0, 1, 5));
    }
  } catch (e) { }
  if (mode == 'title') drawTitleChoices();
}
function writeSave() {
  // Merge the initial save before persisting any newly earned unlocks.
  saveWrites = saveWrites.then(() => storage().set(SAVE_KEY, { night: saved.night })).catch(() => { });
  return saveWrites;
}

// =====================================================================
// SCREENS
// =====================================================================
function screen(m) { ringStop(); if (AC) buzzG[AUDIO_GAIN][AUDIO_VALUE] = fanG[AUDIO_GAIN][AUDIO_VALUE] = 0; litA = 0; mode = m; modeT = 0; wC[DRAW_SET_VISIBLE](false); hideHud(); clearScreen(); }
let titleChoice = 0;
const TITLE_INSET = 52;
const plainMenuHeading = (label) => sText(TITLE_INSET, 38, label, 52, '#eee', 0, 0, { stroke: COLOR_000, strokeThickness: 6 });
const plainMenuRow = (y, label = '') => sText(W - TITLE_INSET, y, label, 22, COLOR_FFF, 1, 0.5, { stroke: COLOR_000, strokeThickness: 5 });
function goTitle() {
  screen('title');
  titleChoice = 0;
  // Balance the two outer edges while keeping the Pitcher at the center.
  const lineup = [[1, 150], [4, 250], [0, 400], [5, 485], [2, 565], [3, 650]];
  uTitleBan = lineup.map(([i, x], k) => ({ i, x, depth: M.abs(k - 2) }))
    .sort((a, b) => b.depth - a.depth)
    .map(({ i, x, depth }) => sAdd(S.add.image(x, 660 - depth * 16, ROLES[i] + '0')[DRAW_SET_SCALE](16 - depth * 0.9)[DRAW_SET_ORIGIN](0.5, 1)));
  uTitleStat = sAdd(S.add[KEY_TILE_SPRITE](0, 0, W, H, 'noise')[DRAW_SET_ORIGIN](0));
  uT1 = sText(TITLE_INSET, 38, 'Five Nights\nat Platanus', 52, '#eee', 0, 0, { lineSpacing: -6, stroke: COLOR_000, strokeThickness: 6 });
  sText(TITLE_INSET + 2, 172, 'La hackathon terminó. Ellos no.', 14, '#889', 0, 0.5);
  uTNew = plainMenuRow(72);
  uTMenu = plainMenuRow(115);
  drawTitleChoices();
}
function drawTitleChoices() {
  const titleRow = (row, i, label) => {
    row[DRAW_SET_TEXT](label)[DRAW_SET_COLOR](titleChoice == i ? CAMERA_SELECTED_TEXT : '#aaa1ad');
  };
  titleRow(uTNew, 0, 'JUEGO NUEVO');
  titleRow(uTMenu, 1, saved.night > 1 ? '◄ NOCHE ' + menuNight + ' ►' : 'NOCHE 1');
}
function titleUpdate() {
  // the opponent stares out of the static, flickers and twitches now and then
  const tw = M[KEY_RANDOM]() < 0.05 ? pick(uTitleBan) : null;
  uTitleBan[KEY_FOR_EACH]((im) => im[DRAW_SET_TINT](im == tw ? 0xff8080 : M[KEY_RANDOM]() < 0.02 ? 0x303030 : 0x8a8a8a)[DRAW_SET_ANGLE](im == tw ? rnd(-6, 6) : im.angle * 0.9));
  uTitleStat[DRAW_SET_TILE_POSITION](rnd(0, 200), rnd(0, 150))[DRAW_SET_ALPHA](tw ? 0.25 : rnd(0.06, 0.12));
  uT1[DRAW_SET_ALPHA](M[KEY_RANDOM]() < 0.03 ? 0.3 : 1);
  const lastChoice = titleChoice, lastNight = menuNight;
  if (pr('U') || pr('D')) titleChoice = 1 - titleChoice;
  const step = Number(pr('R')) - Number(pr('L'));
  if (step) {
    titleChoice = 1;
    menuNight = clamp(menuNight + step, 1, saved.night);
  }
  if (titleChoice != lastChoice || menuNight != lastNight) sfxMenu();
  drawTitleChoices();
  if (pr('S') || pr('1')) {
    const selectedNight = titleChoice ? menuNight : 1;
    sfxMenu(true);
    if (selectedNight == 1) goPaper(0);
    else goCall(selectedNight);
  }
}

let paused = false, nightChoices = null, pauseGain = 0.8;
function showNightChoices(first, grain) {
  const rows = [plainMenuRow(72, first), plainMenuRow(115, 'MENÚ PRINCIPAL')];
  const menu = nightChoices = { grain, rows, selected: -1 };
  rows[KEY_FOR_EACH]((label, i) => {
    label.setInteractive({ useHandCursor: true });
    label.on('pointerover', () => { if (nightChoices == menu) selectNightChoice(i, true); });
    label.on('pointerdown', () => { if (nightChoices == menu) activateMenuChoice(i); });
  });
  selectNightChoice(0);
}
function selectNightChoice(choice, playSound) {
  if (nightChoices.selected == choice) return;
  nightChoices.selected = choice;
  nightChoices.rows[KEY_FOR_EACH]((label, i) => {
    label[DRAW_SET_COLOR](i == choice ? CAMERA_SELECTED_TEXT : '#aaa1ad');
  });
  if (playSound) sfxMenu();
}
function pauseNight() {
  paused = true;
  if (AC) {
    pauseGain = master[AUDIO_GAIN][AUDIO_VALUE];
    master[AUDIO_GAIN][AUDIO_VALUE] = 0;
  }
  // The translucent menu shares this corner with the clock and its labels.
  for (const label of [uHour, uNight, uPauseHint]) label[DRAW_SET_VISIBLE](false);
  sRect(0)[DRAW_SET_ALPHA](0.65);
  plainMenuHeading('PAUSA');
  showNightChoices('CONTINUAR');
}
function activateMenuChoice(choice, confirmB1) {
  nightChoices = null;
  sfxMenu(true);
  // A B1 confirmation should not turn on the flashlight or start coffee.
  if (!choice && confirmB1) ignoreMenuB1 = true;
  if (paused) {
    paused = false;
    if (AC) {
      if (choice) {
        const t = AC[AUDIO_CURRENT_TIME];
        ambG[AUDIO_GAIN][AUDIO_SET_TARGET_AT_TIME](0, t, 0.08);
        droneG[AUDIO_GAIN][AUDIO_SET_TARGET_AT_TIME](0, t, 0.08);
      }
      master[AUDIO_GAIN][AUDIO_VALUE] = pauseGain;
    }
    if (!choice) {
      for (const label of [uHour, uNight, uPauseHint]) label[DRAW_SET_VISIBLE](true);
      clearScreen();
      return;
    }
  }
  if (choice) {
    menuNight = M.min(saved.night, night);
    goTitle();
  } else goCard(night);
}
function nightChoicesUpdate(dt) {
  const grain = nightChoices.grain;
  if (grain) grain[DRAW_SET_TILE_POSITION](grain.tilePositionX + 18 * dt, grain.tilePositionY + 11 * dt);
  if (pr('U') || pr('D')) selectNightChoice(1 - nightChoices.selected, true);
  if (pr('S') || pr('1')) activateMenuChoice(nightChoices.selected, pr('1'));
}

// Newspaper: intro (0) or ending (1). It spins in and slams onto the table.
const PAPERS = arcadeData.newspapers;
function goPaper(end) {
  screen('paper'); uPaperEnd = end;
  const [date, headline, subhead, story, briefTitle, brief, noticeTitle, notice] = PAPERS[end];
  sRect(0x0b0907);
  const pc = sAdd(S.add[DRAW_CONTAINER](400, 300));
  const T = (x, y, s, sz, ex, ox) => sText(x - 400, y - 300, s, sz, '#151515', ox ?? 0.5, 0, Object[KEY_ASSIGN]({ fontFamily: 'Georgia, serif' }, ex), pc);
  const R = (x, y, w, h, col) => sAdd(S.add[DRAW_RECTANGLE](x - 400, y - 300, w, h, col)[DRAW_SET_ORIGIN](0), pc);
  const col = (x, y, s, width = 326) => T(x, y, s, 21, { wordWrap: { width }, lineSpacing: 5, align: 'justify' }, 0);
  R(36, 8, 728, 584, 0xe9e2cc);
  T(400, 16, 'EL DIARIO DEL HACK', 48);
  R(56, 74, 688, 3, 0x151515);
  T(400, 82, date + ' DE NOVIEMBRE, 2026  ·  SANTIAGO  ·  $500', 12);
  R(56, 100, 688, 1, 0x151515);
  const headlineText = T(400, 108, headline, end ? 28 : 33, { fontStyle: 'bold' });
  if (end && headlineText.width > 640) headlineText.setFontSize(M.floor(28 * 640 / headlineText.width));
  T(400, 150, subhead, 20, { fontStyle: 'italic' });
  R(56, 178, 688, 2, 0x151515);
  R(400, 190, 1, 392, 0x151515);
  col(58, 190, story);
  T(414, 190, briefTitle, 20, {}, 0);
  col(414, 220, brief);
  T(572, 370, noticeTitle, 20);
  col(424, 410, notice, 296);
  if (end) T(572, 546, 'FIN', 28);
  const g = sAdd(S.add[DRAW_GRAPHICS](), pc);
  g[DRAW_LINE_STYLE](4, 0xc0201a, 0.9).strokeEllipse(172, 146, 342, 190);
  pc[DRAW_SET_SCALE](3)[DRAW_SET_ANGLE](-540)[DRAW_SET_ALPHA](0);
  S.tweens.add({ targets: pc, scale: 1, angle: end ? 1.5 : -1.5, alpha: 1, duration: 1100, ease: 'Cubic.easeOut', onComplete: () => { sfxDoor(); uiCam.shake(180, 0.008); } });
  uPPress = sText(400, 596, 'START · CONTINUAR', 11, '#888', 0.5, 1);
}
function paperUpdate() {
  uPPress[DRAW_SET_ALPHA](modeT > 1.6 ? 0.5 + M.sin(modeT * 4) * 0.5 : 0);
  if (modeT > 1.6 && anyPr()) { sfxClick(); if (uPaperEnd) goTitle(); else goCall(1); }
}
// The call: a red desk phone alone in the dark. It rings, the speaker turns
// on, and the voice comes out of it line by line. B1 next line, hold START hangs up.
function goCall(n) {
  screen('call'); uCardN = n;
  const [nm, ...ln] = CALLS[n - 1];
  phone = { nm, ln, i: -1, ch: 0, hold: 0, skip: 0 };
  sRect(0x060508);
  sAdd(S.add[DRAW_RECTANGLE](0, 430, W, 170, 0x1c130c)[DRAW_SET_ORIGIN](0)); // the desk
  sAdd(S.add[DRAW_RECTANGLE](0, 430, W, 6, 0x2c2016)[DRAW_SET_ORIGIN](0));
  sAdd(S.add.image(400, -40, 'cone')[DRAW_SET_ORIGIN](0, 0.5)[DRAW_SET_BLEND_MODE](1)[DRAW_SET_ROTATION](PI / 2)[DRAW_SET_SCALE](2.6, 2.2)[DRAW_SET_TINT](0xffe2a0)[DRAW_SET_ALPHA](0.18)); // desk lamp
  const uPhone = sAdd(S.add[DRAW_CONTAINER](400, 470));
  const g = add(uPhone, S.add[DRAW_GRAPHICS]()), cord = add(uPhone, S.add[DRAW_GRAPHICS]());
  g[DRAW_FILL_STYLE](0x000000, 0.4).fillEllipse(0, 34, 360, 40); // shadow
  g[DRAW_FILL_STYLE](0x6a0c0c)[DRAW_FILL_ROUNDED_RECT](-150, -46, 300, 84, 20)[DRAW_FILL_STYLE](0x8e1414)[DRAW_FILL_ROUNDED_RECT](-136, -62, 272, 64, 22); // body
  g[DRAW_FILL_STYLE](0xe6dcc4)[DRAW_FILL_CIRCLE](0, -26, 44)[DRAW_FILL_STYLE](0x1a1a1a);
  for (let i = 0; i < 10; i++) { const a = -2.2 + i * 0.47; g[DRAW_FILL_CIRCLE](M.cos(a) * 31, -26 + M.sin(a) * 31, 6); } // rotary dial
  g[DRAW_FILL_STYLE](0x8e1414)[DRAW_FILL_CIRCLE](0, -26, 14)[DRAW_FILL_STYLE](0xe6dcc4)[DRAW_FILL_CIRCLE](0, -26, 5);
  g[DRAW_FILL_STYLE](0x2a0606); for (let i = 0; i < 4; i++) g[DRAW_FILL_RECT](96, -34 + i * 9, 34, 4); // speaker grille
  cord[DRAW_LINE_STYLE](5, 0x5a0a0a); for (let i = 0; i < 9; i++) cord[DRAW_STROKE_CIRCLE](150 + i * 14, 30 + M.sin(i) * 3, 9); // coiled cord
  uHandset = add(uPhone, S.add[DRAW_CONTAINER](0, -86));
  add(uHandset, S.add[DRAW_GRAPHICS]())[DRAW_FILL_STYLE](0x7a1010)[DRAW_FILL_ROUNDED_RECT](-150, -12, 300, 30, 14)[DRAW_FILL_STYLE](0x8e1414)[DRAW_FILL_ROUNDED_RECT](-170, -2, 76, 36, 14)[DRAW_FILL_ROUNDED_RECT](94, -2, 76, 36, 14);
  uCallName = sText(400, 52, '¡RIIIING!', 22, COLOR_FFD400);
  uCallTxt = sText(400, 92, '', 20, '#ece6d8', 0.5, 0, { wordWrap: { width: 660 }, align: TEXT_CENTER, lineSpacing: 7, fontStyle: 'bold' });
  uCallHint = sText(400, 575, '', 16, '#b9a99a', 0.5, 0.5, { fontFamily: 'sans-serif', stroke: COLOR_000, strokeThickness: 3 });
}
function callUpdate(dt) {
  const c = phone, ringing = c.i < 0;
  if (ringing) {
    // the handset jumps on its cradle while it rings
    const ph = modeT % 3, on = ph < 0.4 || (ph > 0.6 && ph < 1); // it never stops until you answer
    ringBell(on);
    uHandset.setY(-86 - (on ? rnd(0, 6) : 0))[DRAW_SET_ANGLE](on ? rnd(-3, 3) : 0);
    uCallHint[DRAW_SET_TEXT]('B1 · CONTESTAR');
    if (modeT > 0.5 && (pr('1') || pr('S'))) { ringStop(); c.i = 0; sfxClick(); uHandset.setY(-86)[DRAW_SET_ANGLE](0); uCallName[DRAW_SET_TEXT]('☎ ' + c.nm + ' · ALTAVOZ'); }
    return;
  }
  if (c.i >= c.ln.length) {
    // Give the disconnected line a beat before the night begins.
    if ((c.hold += dt) > (uCardN == 5 ? 1.6 : 0.6)) goCard(uCardN);
    return;
  }
  if (hd('S')) { if ((c.skip += dt) > 0.7) return hangUp(c); } else c.skip = 0;
  const line = c.ln[c.i], prev = c.ch | 0;
  c.ch = M.min(line.length, c.ch + dt * (line == '...' ? 4 : 36) / .85); // silences are slow
  const talking = c.ch < line.length;
  if ((c.ch | 0) != prev && (c.ch | 0) % 2 == 0 && line[c.ch | 0] != ' ') sfxBlip(1, c.nm == 'NACHO' ? rnd(155, 255) : rnd(275, 445));
  uCallTxt[DRAW_SET_TEXT](line.slice(0, c.ch | 0));
  if (!talking && uCardN == 5 && c.i == c.ln.length - 1) {
    uCallHint[DRAW_SET_TEXT]('');
    if ((c.hold += dt) >= 2) hangUp(c, true);
    return;
  }
  uCallHint[DRAW_SET_TEXT]((talking ? '' : 'B1 · SIGUIENTE      ') + 'MANTÉN START · COLGAR');
  if (pr('1')) {
    if (talking) c.ch = line.length;
    else { c.i++; c.ch = 0; if (c.i >= c.ln.length) hangUp(c); }
  }
}
function hangUp(c, cut) {
  c.i = c.ln.length; c.hold = 0;
  if (cut) { sfxClick(); uCallTxt[DRAW_SET_TEXT](c.ln[c.ln.length - 1] + '\n\n*click*'); uCallName[DRAW_SET_TEXT]('☎ LLAMADA CORTADA')[DRAW_SET_COLOR]('#ff5555'); }
  else { sfxClick(); uCallTxt[DRAW_SET_TEXT](''); uCallName[DRAW_SET_TEXT]('*click*'); }
  uCallHint[DRAW_SET_TEXT]('');
}
function goCard(n) {
  screen('card'); uCardN = n;
  sRect(0);
  uC1 = sText(400, 270, '12:00 AM', 54);
  uC2 = sText(400, 330, 'NOCHE ' + n, 26, '#aab');
  sfxStatic(0.4);
}
function cardUpdate() {
  const a = modeT < 0.4 ? modeT / 0.4 : modeT > 2.2 ? M.max(0, 1 - (modeT - 2.2) / 0.4) : 1;
  uC1[DRAW_SET_ALPHA](a * (M[KEY_RANDOM]() < 0.04 ? 0.4 : 1)); uC2[DRAW_SET_ALPHA](a);
  if (modeT > 2.6 || (modeT > 0.6 && pr('S'))) startNight(uCardN);
}

// =====================================================================
// NIGHT SETUP
// =====================================================================
const mkE = (role, r, [x, y], st, o) => Object[KEY_ASSIGN]({ role, r, x, y, st, fx: 1, t: 0, anim: 0, snd: rnd(0, 2), shake: 0, ot: rnd(1, 3), kd: null, at: 0 }, o);
function startNight(n) {
  clearScreen();
  if (FX) S[KEY_CAMERAS].main.hasPostPipeline = true;
  night = n; NN = NIGHTS[n - 1]; [hl, drain, sueRate, wakeH, patience, flashes] = NN; nightLen = hl * 6; now = 0; power = 99; sueno = n == 1 ? 0 : 8; blackout = 0;
  pitchOn = patience > 0; mentoraOn = n >= 4; coderOn = n == 5; pgrace = 4.2 - n * 0.3;
  lesson = { tabletOpened: false, blocked: false, rested: false };
  firstDeparture = Infinity; scareTablet = 0; camLit = 0;
  view = STATE_OFFICE; va = 0; pan = (PW - W) / 2; panV = 0; litN = 0; prevCam = null; focus = 'N'; camR = 0; statA = light = plug = cutH = cof = cofT = cofHold = drink = lidY = 0;
  doors = { W: 0, E: 0 }; doorP = { W: 0, E: 0 }; plug = -1; flash = hallu = 0;
  blink = 0; blinkT = rnd(8, 14); dread = heartT = msgT = flick = 0; scareT = rnd(14, 24);
  thought = doomed = null; thOnce = {};
  clicking = clickT = yawn1 = yawn2 = scrOn = 0;
  E = {
    pitcher: mkE(STATE_PITCHER, 1, PITCH_HOME, STATE_PITCH, { slide: 1, bar: 1 }),
    sleeper: mkE(STATE_SLEEPER, 5, SLEEP_HOME, STATE_SLEEP, { wakeAt: rnd(wakeH, wakeH + 1) * hl }),
    mentora: mkE(STATE_MENTORA, 9, [130, 300], 'REST', { t: n == 5 ? FINAL_NIGHT_START.mentora : hl / 2, target: -1, visits: 0, side: 'E' }),
    coder: mkE(STATE_CODER, 0, [350, 170], 'TYPE', { plugT: FINAL_NIGHT_START.coder }),
    fe: mkE('fe', 0, [SEATS.fe, 170], 'SEAT', { t: [2, 21, 55, 45, FINAL_NIGHT_START.fe][n - 1] }),
    be: mkE('be', 0, [SEATS.be, 170], 'SEAT', { t: 0 }),
  };
  mode = STATE_PLAY; modeT = 0;
  wC[DRAW_SET_VISIBLE](true); uHud[DRAW_SET_VISIBLE](true);
  for (const o of [uPow, uHour, uNight, uSue, uMsg, uPauseHint]) o[DRAW_SET_VISIBLE](true);
  if (AC) {
    master[AUDIO_GAIN][AUDIO_VALUE] = .8;
    ambG[AUDIO_GAIN][AUDIO_SET_TARGET_AT_TIME](1, AC[AUDIO_CURRENT_TIME], 0.5);
  }
  setMsg('', 0);
}
const hourOf = (t) => (t / hl) | 0;
const clockStr = (t) => (hourOf(t) || 12) + ' AM'; // hours only, like FNAF

// ---- thoughts ----
function think(s, once, dur) {
  if (once) { if (thOnce[once]) return; thOnce[once] = 1; }
  thought = { s, t: dur || 3.4 };
}

// =====================================================================
// MAIN UPDATE
// =====================================================================
function update(time, delta) {
  const dt = M.min(0.05, delta / 1000);
  if (paused) nightChoicesUpdate(dt);
  else if (mode == STATE_PLAY && pr('S')) pauseNight();
  else {
    modeT += dt;
    if (FX) { FX.t += dt; if (mode != STATE_PLAY && mode != 'scream') Object[KEY_ASSIGN](FX, { nv: 0, lit: 0, of: +(mode == 'doze'), no: mode == 'title' ? 0.06 : 0.02, ab: 0.2, dk: 0.2, wp: 0 }); }
    if (mode == STATE_PLAY) playUpdate(dt);
    else ({ doze: dozeUpdate, title: titleUpdate, paper: paperUpdate, call: callUpdate, card: cardUpdate, scream: screamUpdate, lose: nightChoicesUpdate, win: winUpdate })[mode](dt);
  }
  for (const k in pressed) pressed[k] = 0;
}
function playUpdate(dt) {
  // Give a first-time player time to find the tablet.
  const briefing = night == 1 && !lesson.tabletOpened && !blackout;
  if (!briefing || now < 10) now += dt;
  if (now >= nightLen) return winNight();
  const cameraWasOn = view == 'cams', flashlightWasOn = light || camLit;
  input(dt);
  const activations = Number(!cameraWasOn && view == 'cams') + Number(!flashlightWasOn && (light || camLit));
  updateResources(dt, briefing, activations);
  if (mode != STATE_PLAY) return;
  if (blackout) {
    if (now >= cutAt) {
      lose('power');
      screamUpdate();
    }
    else {
      updateThoughts(dt);
      render(dt);
    }
    return;
  }
  updateBlink(dt);
  revealDoorway();
  aiPitcher(dt); aiSleeper(dt); aiMentora(dt); aiCoder(dt); aiTeam(E.fe, 'W', dt);
  if (mode == STATE_PLAY) aiTeam(E.be, 'E', dt);
  if (mode != STATE_PLAY) return;
  updateDoom(dt);
  if (mode != STATE_PLAY) return;
  audioCues(dt);
  updateThoughts(dt);
  render(dt);
}

// =====================================================================
// INPUT — office (look around, doors, lights, coffee) and cameras
// =====================================================================
function input(dt) {
  const office = view == STATE_OFFICE;
  const dir = hd('R') - hd('L');
  // free look with weight: the chair picks up speed, and glides to a stop when
  // you let go; a soft bump at the ends; it creaks when it starts turning
  if (office && (pr('L') || pr('R')) && M.abs(panV) < 120 && M[KEY_RANDOM]() < 0.6) sfxSwivel();
  const atCounter = pan >= COFFEE_START && pan < COFFEE_END;
  const speed = atCounter ? 670 : 1000;
  panV = lerp(panV, office ? dir * speed : 0, 1 - M.exp(-(dir ? 6 : 24) * dt));
  pan += panV * dt;
  if (pan < 0 || pan > PW - W) { pan = clamp(pan, 0, PW - W); panV *= -0.15; }
  // what you are facing: where your view sits across the room (all the way left = the left door)
  focus = pan < 118 ? 'W' : pan < COFFEE_START ? 'N' : pan < COFFEE_END ? 'C' : 'E';
  if (focus != 'C' || !office) cofHold = 0;
  va = clamp(va + dt * (office ? -1 / .17 : 1 / .22), 0, 1);
  const was = light || camLit;
  light = camLit = clicking = flash = 0;
  // B1 = light · B2 = do something · B3 = the tablet · B4 = previous camera
  if (office) {
    if (drink > 0) return; // drinking: cup in front of your face
    if (pr('3') && !blackout) { view = 'cams'; statA = 0.9; sfxStatic(.12); makeNoise(0.15); return; }
    // somebody got in: nothing in the office responds any more (FNAF1)
    if (doomed) { if (pr('1') || pr('2')) sfxClick(); return; }
    if (va > 0) { lightSnd(was); return; }
    if (focus == 'C') {
      lightSnd(was);
      // coffee: hold B1 to brew a cup, wait for it, press B1 to drink it
      if (!cof && !blackout && hd('1')) { if ((cofHold += dt) > 0.6) { cofHold = 0; cof = 1; cofT = BREW; sfxCoffee(); makeNoise(0.5); } }
      else cofHold = 0;
      if (cof > 1 && pr('1')) { cof = 0; drink = SIP; sfxEat(); makeNoise(0.2); }
      return;
    }
    light = hd('1') && !blackout && focus ? 1 : 0;
    if (pr('1') && light) { HINT.light++; flash = focus; }
    if (pr('2') && focus) { toggleDoor(focus); HINT.door++; }
    lightSnd(was);
    return;
  }
  if (blackout) { view = STATE_OFFICE; lightSnd(was); return; }
  if (pr('3')) { view = STATE_OFFICE; sfxStatic(.12); makeNoise(0.15); return; }
  if (va < 1) return;
  lesson.tabletOpened = true;
  // The stick follows the rows and columns drawn on the camera map.
  const direction = ['L','R','U','D'].find(pr);
  let n = direction ? CAMERA_LINKS[camR][direction] ?? -1 : -1;
  if (pr('4') && prevCam != null) { [camR, prevCam] = [prevCam, camR]; n = -1; sfxStatic(.12); statA = 0.85; }
  if (n >= 0) { prevCam = camR; camR = n; sfxStatic(.12); statA = 0.85; if (now > hl * 2 && !hd('1') && M[KEY_RANDOM]() < 0.035) hallu = 0.14; } // sometimes a face that is not there
  // FNAF2: the feed is almost black. B1 = the camera's flashlight (costs power)
  camLit = hd('1') && va >= 1 ? 1 : 0;
  if (camLit) litN = 1;
  const mentor = E.mentora;
  if (mentor.st == STATE_CALL && camR == mentor.target && pr('2')) divertMentora(mentor);
  lightSnd(was);
  // B2 is this camera's action: the pitch room clicker, or the coder's cord
  clicking = hd('2') && camR == 1 && pitchOn && E.pitcher.r == 1;
  if (camR == 0 && plug >= 0 && hd('2')) { if ((cutH += dt) > 1.2) { cutH = 0; plug = -1; sfxErr(); setMsg('ENCHUFE CORTADO', 1.4); coderAngry(); } } else cutH = 0;
  if (clicking) {
    const p = E.pitcher;
    p.bar = M.min(1, p.bar + dt / 6); // a full refill takes a while
    if ((clickT = (clickT || 0) - dt) <= 0) { clickT = 0.45; p.slide++; HINT.slide++; sfxClick(); }
  }
}
// flashlight sounds: a heavy click on, a click off, and the bulb buzzing while it is on
function lightSnd(was) {
  const on = light || camLit;
  if (on && !was) sfxFlash(1); else if (!on && was) sfxFlash(0);
  if (AC) buzzG[AUDIO_GAIN][AUDIO_SET_TARGET_AT_TIME](on ? 0.035 : 0, AC[AUDIO_CURRENT_TIME], 0.03);
}
function toggleDoor(d) {
  if (d == 'N') return think('Aquí no hay puerta...', 'nodoor');
  if (blackout) { sfxErr(); think('No hay energía... las puertas no responden.', 'outdoor'); return; }
  doors[d] ^= 1;
  sfxDoor(); makeNoise(0.35);
}
// noise stirs the sleepwalker while he stands in the front hallway (UCN-style
// meter): it adds up and drains slowly, so one thing at a time is fine.
function makeNoise(v, why) {
  const s = E.sleeper;
  if (s.st != STATE_FRONT) return;
  s.stir += v;
  s.why = why || 'Hiciste demasiado ruido.';
  if (!s.warn) {
    s.warn = true;
    statA = M.max(statA, .76);
    sfxStir();
  }
}
const doorClosed = (d) => doorP[d] > 0.5;
// A closing command stops an attack immediately, even before the sprite reaches halfway.
const doorBlocks = (d) => SIDES.includes(d) && (doors[d] || doorClosed(d));

// ---- Resources ----
// Battery percentage points charged once when a device goes from off to on.
const DEVICE_POWER_PENALTY = 0.4;
function updateResources(dt, briefing, activations) {
  for (const d of SIDES) doorP[d] = clamp(doorP[d] + (doors[d] ? dt : -dt) / 0.45, 0, 1);
  if (cof == 1 && (cofT -= dt) <= 0) { cof = 2; tone(880, 0.25, 's', 0.12); } // ding
  if (drink > 0 && (drink -= dt) <= 0) { sueno = M.max(0, sueno - 60); setMsg('☕  -SUEÑO', 1.2); }
  if (!blackout) {
    // FNAF-style power: doors, door light, cameras and the coder's extension cord all drain
    const cameraOn = view == 'cams', flashlightOn = light || camLit;
    let u = drain + (doorP.W > 0) * 0.2 + (doorP.E > 0) * 0.2 + light * 0.32 + camLit * 0.2 + cameraOn * 0.1 + (cof == 1) * 0.15;
    if (plug >= 0) u += night >= 5 ? 0.5 : 0.4;
    usage = 1 + (doorP.W > 0) + (doorP.E > 0) + flashlightOn + cameraOn + (cof == 1) + (plug >= 0); // one bar per device
    const drainThisFrame = briefing ? 0 : u * NN[10] * dt;
    if ((power -= drainThisFrame + DEVICE_POWER_PENALTY * activations) <= 0) powerOut();
  }
  if (briefing || blackout) return;
  sueno += dt * 100 / sueRate;
  if (sueno > 50 && !yawn1) { yawn1 = 1; sfxYawn(); think('*bostezo* Se me cierran los ojos... necesito un café.', 'sleepy'); }
  if (sueno > 75 && !yawn2) { yawn2 = 1; sfxYawn(); think('No... no te duermas. CAFÉ.', 'sleepy2'); }
  if (sueno < 40) yawn1 = yawn2 = 0;
  if (sueno > 90) think('Los ojos... se me cierran solos...', 'sleepy3', 3);
  if (sueno >= 100) doze();
}
function powerOut() {
  power = light = camLit = cof = drink = 0; blackout = 1; doors = { W: 0, E: 0 }; view = STATE_OFFICE;
  cutAt = now + rnd(6, 9);
  thought = doomed = null;
  msgT = blink = lidY = 0;
  if (AC) {
    fanG[AUDIO_GAIN][AUDIO_SET_TARGET_AT_TIME](0, AC[AUDIO_CURRENT_TIME], .2);
    buzzG[AUDIO_GAIN][AUDIO_SET_TARGET_AT_TIME](0, AC[AUDIO_CURRENT_TIME], .04);
    ambG[AUDIO_GAIN][AUDIO_SET_TARGET_AT_TIME](0, AC[AUDIO_CURRENT_TIME], .5);
    droneG[AUDIO_GAIN][AUDIO_SET_TARGET_AT_TIME](0, AC[AUDIO_CURRENT_TIME], .95);
  }
  sfxErr(); noise(2, 0.4, 'l', 200, 60);
}
function updateBlink(dt) {
  if (blink > 0) { blink -= dt; return; }
  if (sueno < 30 || (blinkT -= dt) > 0) return;
  const s = (sueno - 30) / 70;
  blink = blinkDur = lerp(0.14, 0.6, s);
  blinkT = lerp(9, 2.2, s) * rnd(0.7, 1.3);
}
const blinking = () => blink > 0;
function setMsg(s, t) { uMsg[DRAW_SET_TEXT](s); msgT = t; }
function discoverySound() {
  // Let the bulb click clear before the low impact and detuned, metallic tail.
  tone(148, .76, 's', .83, 52, .055);
  tone(246, .93, 'w', .32, 105, .07);
  tone(258, 1.14, 't', .32, 112, .09);
  noise(.26, .48, 'b', 1380, 380, .06, 2);
}
function revealDoorway() {
  if (view != STATE_OFFICE || !light || blinking() || doorClosed(focus)) return;
  const e = Object.values(E).find(visitor => visitor.role != STATE_SLEEPER && visitor.kd == focus && !visitor.revealed);
  if (!e) return;
  e.revealed = true;
  discoverySound();
}
function updateThoughts(dt) {
  if (thought && (thought.t -= dt) <= 0) thought = null;
  if (!blackout && view == STATE_OFFICE && va == 0 && focus == 'N' && !blinking() && E.sleeper.st == STATE_FRONT) {
    think('No debo despertarlo. Apago la luz y espero. Nada de mover puertas, usar la tableta ni preparar o tomar café.', 'quiet', 5.5);
  }
}

// hunters never cut through your office
function blocked(all) {
  const b = new Set();
  for (const d of ADOOR) if (all || doorClosed(d)) b.add(ek(CTRL, CDOOR[d].adj));
  return b;
}
// ---- The AI core (FNAF1): a movement opportunity every iv seconds; it
// succeeds with chance level/20. Levels come from the night and the hour.
const lvl = (k) => { const b = NN[LV[k]]; return b ? M.min(20, b + clamp(hourOf(now) - 1, 0, 3)) : 0; };
function roll(e, iv, dt, L) {
  if ((e.ot -= dt) > 0) return 0;
  e.ot = iv * rnd(0.8, 1.2);
  return rnd(0, 20) < (L ?? lvl(e.role));
}
// Nobody moves while you watch them: they don't leave the room on your screen
// (unless they're out of sight in a doorway) and don't walk into it either.
// The moment you look away, they go.
const looking = (r) => view == 'cams' && va >= 1 && camR == r && !blackout;
function canGo(e, n) {
  if (view == STATE_OFFICE && e.kd == focus && light && !doorClosed(focus)) return false;
  if (e.role == 'fe' || e.role == 'be' || e.role == STATE_CODER) {
    if (view == 'cams' && va >= 1 && (camR == n || camR == e.r)) return false;
  }
  return !(looking(e.r) && !blindDoor(e)) && !looking(n);
}
function move(e, n, s) {
  if (!canGo(e, n)) return (e.ot = 0.25), 0; // try again as soon as you look away
  hop(e, n, s); return 1;
}
// People never walk on screen: one opportunity, one room, and they are simply
// somewhere else (only while you don't watch: see move). The footsteps tell you
// how close they are.
function hop(e, n, s) {
  glitch(e.r); glitch(n);
  s = s || pick(ROOMS[n][11]);
  e.fx = s[0] < ROOMS[n][2] / 2 ? 1 : -1; // facing into the room
  e.r = n; e.x = s[0]; e.y = s[1];
  sfxRoom([1.2, 1, 0.65, 0.45, 0.35][HOP[n]] ?? 0.3);
}
// one room closer to room t (s: where to stand once there). True once there.
function stepTo(e, t, s) {
  if (e.r != t) { const p = bfs(e.r, t, blocked(1)); if (p) move(e, p[1], p[1] == t ? s : 0); }
  return e.r == t;
}
// a random room next door, among the ones people hang around in
const nextRoam = (e) => pick(NB[e.r].filter((q) => ROAM.includes(q)));
// the camera you are watching cuts out for a moment when someone moves in it
function glitch(r) { if (view == 'cams' && camR == r && va >= 1) { statA = 1; sfxStatic(0.25); } }

// ---- Doorways ----
// the blind spot right outside each door takes one person at a time
const doorFree = (d, e) => !Object.values(E).some((o) => o != e && o.kd == d);
// step into the doorway of door d: a floorboard creaks on that side
function toDoor(e, d) {
  // The figure waits around the corner until the beam leaves the entrance.
  if (view == STATE_OFFICE && focus == d && light) return 0;
  const a = CDOOR[d].adj, b = blindPt(d);
  if (e.r != a) { if (!move(e, a, b)) return 0; }
  else if (canGo(e, a)) [e.x, e.y] = b;
  else return (e.ot = 0.25), 0;
  Object[KEY_ASSIGN](e, { kd: d, at: 0, kt: 0, kn: 0.4, bt: 0.8, revealed: false, attackIn: 0 });
  sfxCreak();
  if (night == 2 && (e.role == 'fe' || e.role == 'be')) {
    sfxStep(2.1, .12);
    sfxStep(1.65, .4);
  }
  if (e.role == STATE_PITCHER) think('¡Está pidiendo preguntas! Suelta y pulsa B1 varias veces en el centro.', 'frontPitch', 4);
  return 1;
}
// waiting in a doorway: 1 while the door is open (e.at counts how long),
// 0 while closed (they knock now and then, e.kt counts how long)
function atDoor(e, dt) {
  if (!doorBlocks(e.kd)) return (e.at += dt), 1;
  e.at = 0; e.kt += dt;
  if ((e.kn -= dt) <= 0) { e.kn = rnd(3, 6); sfxKnock(); }
  return 0;
}
const leaveDoor = (e) => (e.kd = null);

// =====================================================================
// AI
// =====================================================================
// THE TEAM (FNAF1 Bonnie & Chica): Frontend and Backend leave the code room
// along a fixed route to their side of your office. The corner camera is the
// last warning: they stand right under it, staring into the lens. Next step,
// your doorway. Door closed on their next opportunity = back to the dining
// room. Door open = they are in.
const ROUTE = { fe: [0, 3, 7, 8], be: [0, 3, 9, 10] };
// Night 2 tours the side rooms through the corridors shown on the camera map.
const NIGHT_TWO_ROUTE = { fe: [0, 3, 2, 3, 7, 6, 7, 8], be: [0, 3, 4, 3, 9, 11, 9, 10] };
const DETOUR = { fe: { 3: 2, 7: 6 }, be: { 3: 4, 9: 11 } };
const STARE = { 8: [92, 96], 10: [208, 96] }; // right under the corner camera
const NIGHT_TWO_OPEN_WINDOW = 4.5;
function teamAtDoor(e, dt, ready, openWindow) {
  if (!atDoor(e, dt)) { e.attackIn = 0; return false; }
  // Keep the intruder outside and visible during the last chance to shut the door.
  if (e.attackIn > 0) {
    e.attackIn -= dt;
    if (e.attackIn <= 0 && !doomed) {
      const tablet = va;
      lose(e.role, null, e.kd);
      scareTablet = tablet;
      scrDelay = 0;
      screamUpdate();
    }
  } else if (ready && e.at >= openWindow && !doomed) {
    e.attackIn = 1.5;
    sfxStep(2.2);
  }
  return true;
}
function aiTeam(e, d, dt) {
  e.anim += dt;
  const firstLesson = night == 1 && e.role == 'fe';
  const tour = night == 2;
  const route = (tour ? NIGHT_TWO_ROUTE : ROUTE)[e.role];
  const firstStop = route[1];
  if (e.st == 'SEAT') {
    if (firstLesson && (!lesson.tabletOpened || modeT < 12)) return;
    if (e.role == 'be' && (night == 1 || now < firstDeparture + (night == 2 ? 34 : 21))) return;
    if (e.role == 'be' && night == 5 && now < FINAL_NIGHT_START.be) return;
    e.t -= dt;
    if (e.t > 0 || !canGo(e, firstStop)) return;
    sfxChair(.9);
    hop(e, firstStop);
    e.st = 'ROAM'; e.ot = firstLesson ? 4 : 5; e.routeIndex = 1;
    if (e.role == 'fe') firstDeparture = now;
    return;
  }
  if (firstLesson && !lesson[KEY_BLOCKED]) {
    if (e.kd) {
      if (!teamAtDoor(e, dt, true, 12) && e.kt > 1.3 && move(e, 3)) {
        leaveDoor(e); lesson[KEY_BLOCKED] = true;
        E.sleeper.wakeAt = now + 7;
      }
    } else if ((e.ot -= dt) <= 0) {
      e.ot = 3;
      if (e.r == 8) toDoor(e, d);
      else move(e, e.r == 3 ? 7 : 8, e.r == 7 ? STARE[8] : null);
    }
    return;
  }
  if (firstLesson && !lesson[KEY_RESTED]) return;
  if (firstLesson && !lesson.revisited && !e.kd) {
    if ((e.ot -= dt) > 0) return;
    e.ot = 6;
    if (e.r == 8) lesson.revisited = toDoor(e, d);
    else move(e, e.r == 3 ? 7 : 8, e.r == 7 ? STARE[8] : null);
    return;
  }
  if (e.st == 'RETREAT') {
    if ((e.ot -= dt) <= 0) {
      e.ot = 2.6;
      if (stepTo(e, firstStop)) { e.st = 'ROAM'; e.routeIndex = 1; }
    }
    return;
  }
  if (e.st != 'ROAM') return;
  const go = roll(e, tour && !e.kd ? 2.6 : 4.5, dt);
  if (e.kd) {
    const openWindow = tour ? NIGHT_TWO_OPEN_WINDOW : 2.5;
    if (!teamAtDoor(e, dt, go, openWindow) && go) {
      if (tour) {
        const previous = route[route.length - 2];
        if (move(e, previous)) { leaveDoor(e); e.st = 'RETREAT'; e.ot = 2.6; }
      } else if (move(e, firstStop)) leaveDoor(e);
    }
    return;
  }
  if (!go) return;
  const i = tour ? e.routeIndex : route.indexOf(e.r);
  if (tour) {
    const next = route[i + 1];
    if (next == null) { if (doorFree(d, e)) toDoor(e, d); }
    else if (move(e, next, STARE[next])) e.routeIndex++;
    return;
  }
  const dr = DETOUR[e.role][e.r];
  if (i < 0) move(e, e.from); // back from a detour
  else if (i == route.length - 1) { if (doorFree(d, e)) toDoor(e, d); }
  else if (dr != null && M[KEY_RANDOM]() < 0.25) { const f = e.r; if (move(e, dr)) e.from = f; }
  else if (i > 1 && M[KEY_RANDOM]() < 0.15) move(e, route[i - 1]); // a step back now and then
  else move(e, route[i + 1], STARE[route[i + 1]]);
}

// THE PITCHER (FNAF2 music box + hallway Foxy): his patience drains while he
// pitches to an empty room. Hold B2 on his camera to pass slides; a full
// refill takes a while, and that time is the price. Empty: he walks off to
// find an audience. While you watch him on camera he stays and pitches to you.
// In the front hallway, flash him enough times and he goes back to the stage.
function aiPitcher(dt) {
  const p = E.pitcher;
  p.anim += dt;
  if (p.st == STATE_PITCH) {
    if (!pitchOn) return;
    if (!clicking && (night != 5 || now >= FINAL_NIGHT_START.pitchDrain)) p.bar -= dt / patience;
    p.shake = p.bar < 0.35 ? (0.35 - p.bar) * 4 : 0;
    if (p.bar <= 0) { p.bar = p.shake = 0; p.st = 'SEARCH'; p.ot = 1.5; tone(330, 0.5, 't', 0.1, 220); }
  } else if (p.st == 'SEARCH') {
    // he just stepped off the stage: passing slides now still calls him back
    if (p.r == 1 && p.bar > 0.3) return back(p, '"¡AH! ¡SIGUIENTE DIAPOSITIVA!"');
    if (!roll(p, 2.5, dt)) return; // while you watch him he stays and pitches to the camera
    if (p.r != 12) stepTo(p, 12);
    else if (doorFree('N', p) && toDoor(p, 'N')) { p.st = STATE_FRONT; p.fl = 0; }
  } else if (p.st == STATE_FRONT) {
    p.at += dt; p.shake = M.max(0, p.shake - dt * 2);
    if (flash == 'N') { p.at = 0; p.shake = 1.4; if (++p.fl >= flashes) return back(p, '"...ok, ok. Sin preguntas."'); }
    if (p.at > pgrace) doom(STATE_PITCHER, p);
  } else if (p.st == 'RETURN' && (p.ot -= dt) <= 0) {
    p.ot = 1.2;
    if (stepTo(p, 1, PITCH_HOME)) { p.st = STATE_PITCH; [p.x, p.y] = PITCH_HOME; }
  }
}
// send the pitcher back to the stage, with some patience
function back(p, msg) { p.st = 'RETURN'; p.ot = 0.8; p.bar = M.max(p.bar, 0.4); p.shake = 0; leaveDoor(p); setMsg(msg, 1.6); }

// THE SLEEPWALKER (FNAF4): sleeps in the siesta room, gets up now and then and
// ends up standing in your front hallway, snoring, his z's floating out of
// the dark. Noise from doors, the tablet and coffee stirs him.
// So does light after a quick look. Stir drains slowly. At full,
// he wakes up. Leave him be and he shuffles back to bed.
function aiSleeper(dt) {
  const s = E.sleeper;
  s.anim += dt;
  if (s.st == STATE_SLEEP) {
    s.shake = 0;
    if ((night != 1 || lesson[KEY_BLOCKED]) && now > s.wakeAt) { s.st = 'WALK'; s.ot = 2; tone(300, 0.3, 't', 0.1, 500); }
  } else if (s.st == 'WALK') {
    if (night == 1 && !lesson[KEY_RESTED]) {
      if ((s.ot -= dt) > 0) return;
      s.ot = 2;
    } else if (!roll(s, night == 2 ? 2.25 : 3, dt)) return;
    if (s.r != 12) {
      if (night >= 3 && M[KEY_RANDOM]() < 0.2) move(s, nextRoam(s));
      else stepTo(s, 12);
    }
    else if (doorFree('N', s) && toDoor(s, 'N')) Object[KEY_ASSIGN](s, { st: STATE_FRONT, t: rnd(7, 11), stir: 0, lit: 0, warn: false });
  } else if (s.st == STATE_FRONT) {
    s.at += dt;
    const lit = view == STATE_OFFICE && focus == 'N' && light;
    if (lit && s.lit == 0) makeNoise(.15, TEXT_LO_ALUMBRASTE_DEMASIADO);
    s.lit = lit ? s.lit + dt : 0;
    if (s.lit > (night == 1 && !lesson[KEY_RESTED] ? 1.5 : .4)) makeNoise(dt * 1.1, TEXT_LO_ALUMBRASTE_DEMASIADO);
    if (s.stir >= 1) return wakeUp(s);
    s.stir = M.max(0, s.stir - dt * 0.12);
    if (s.stir === 0) s.warn = false;
    if ((s.t -= dt) <= 0) { leaveDoor(s); s.st = 'HOME';
      if (night == 1 && !lesson[KEY_RESTED]) {
        lesson[KEY_RESTED] = true; E.fe.ot = 10;
        think('Me vendría bien un café.', 'coffeeLesson', 2.5);
      } s.ot = 1.5; }
  } else if (s.st == 'HOME') {
    if ((s.ot -= dt) <= 0) {
      s.ot = night == 2 ? 1.3 : 2.2;
      if (stepTo(s, 5, SLEEP_HOME)) {
        s.st = STATE_SLEEP;
        [s.x, s.y] = SLEEP_HOME;
        s.wakeAt = now + hl * rnd(0.5, 1) * (1.2 - night * 0.1);
      }
    }
  } else if (s.st == 'ANGRY' && (s.t -= dt) <= 0) doom(STATE_SLEEPER, s, s.why);
}
function wakeUp(s) { s.st = 'ANGRY'; s.t = 0.7; s.shake = 1.4; tone(140, 0.6, 'w', 0.35, 70); setMsg('"¡¿QUIÉN ANDA AHÍ?!"', 1.5); }

// A lit speaker marks the room where the mentor can be called away.
function divertMentora(m) {
  m.st = 'DIVERT'; m.ot = .75;
  tone(620, .12, 's', .15); tone(840, .18, 's', .15, 0, .13);
  sfxStep(.75); sfxStep(.35, .4);
  setMsg('«Se solicita a la mentora en ' + ROOMS[m.target][0][KEY_TO_LOWER_CASE]() + '».', 2.4);
  think('Los pasos se alejan.', 0, 3);
}
function aiMentora(dt) {
  if (!mentoraOn) return;
  const m = E.mentora;
  m.anim += dt;
  if (m.st == 'REST') {
    if ((m.t -= dt) > 0) return;
    m.side = m.visits ? pick(SIDES) : 'E';
    m.target = m.visits ? pick([2, 3, 4, 5, 11]) : 3;
    m.visits++; m.st = STATE_CALL; m.t = m.visits == 1 ? 17 : 11;
    m.ot = 1; sfxMurmur(1.4);
    setMsg('«¿Hay alguien por aquí?»', 2.5);
  }
  if (m.st == STATE_CALL && (m.t -= dt) <= 0) { m.st = STATE_APPROACH; m.ot = .2; }
  if (m.kd) {
    if (atDoor(m, dt)) { if (m.at > 3.2) doom(STATE_MENTORA, m); }
    else if (m.kt > 2.5 && move(m, 3)) { leaveDoor(m); m.st = 'REST'; m.t = 38; }
    return;
  }
  if ((m.ot -= dt) > 0) return;
  m.ot = 1.6;
  if (m.st == 'DIVERT') {
    if (stepTo(m, m.target)) { m.st = 'REST'; m.t = rnd(32, 44); }
  } else if (m.st == STATE_CALL) {
    stepTo(m, m.side == 'E' ? 9 : 7);
  } else if (m.st == STATE_APPROACH) {
    if (m.r != CDOOR[m.side].adj) stepTo(m, CDOOR[m.side].adj);
    else if (doorFree(m.side, m)) toDoor(m, m.side);
  }
}

// THE CODER (FNAF1 Freddy at the power-out): plugs his rig into your power on
// the last night. Cut the cord and he comes to complain at one of your doors.
function coderAngry() {
  const c = E.coder;
  if (c.st == 'COMPLAIN') return;
  c.st = 'WAIT'; c.t = rnd(1.5, 3); leaveDoor(c);
}
function aiCoder(dt) {
  const c = E.coder;
  c.anim += dt;
  if (c.st == 'TYPE') { if (coderOn && plug < 0 && (c.plugT -= dt) <= 0) { plug = 0; setMsg('SOBRECARGA · CAM 1A', 3); sfxType(0.8); } }
  else if (c.st == 'WAIT') {
    if (!looking(c.r) && (c.t -= dt) <= 0) { c.st = 'COMPLAIN'; c.side = pick(SIDES); c.ot = 1; }
  }
  else if (c.st == 'COMPLAIN') {
    if (c.kd) {
      if (atDoor(c, dt)) { if (c.at > 2.2) doom(STATE_CODER, c); }
      else if (c.kt > c.stay) { leaveDoor(c); c.st = 'BACK'; c.ot = 1; }
    } else if ((c.ot -= dt) <= 0) {
      c.ot = 2.2;
      const a = CDOOR[c.side].adj;
      if (c.r != a) stepTo(c, a); else if (doorFree(c.side, c) && toDoor(c, c.side)) c.stay = rnd(7, 11);
    }
  } else if (c.st == 'BACK') {
    if ((c.ot -= dt) <= 0) { c.ot = 2; if (stepTo(c, 0, [SEATS.coder, 170])) { c.st = 'TYPE'; c.plugT = rnd(32, 44); } }
  }
}

// ---- Attacks ----
// When a threat gets in it does NOT scream right away. The lights flicker,
// every button in the office goes dead, and it waits. The scare lands when you
// lower the camera or turn your head... or whenever it feels like it.
function doom(why, e, hint) {
  if (doomed || doorBlocks(e.kd)) return;
  doomed = { why, hint, t: 0, max: rnd(2.2, 3.4), side: e.kd || 'W' };
  leaveDoor(e); e.r = CTRL; // inside now, out of every camera and doorway
  e.ps = e.st; e.st = 'DOOM'; // keeps sounding exactly as before: no silence gives it away
  sfxGroan();
}
function updateDoom(dt) {
  const d = doomed;
  if (!d) return;
  d.t += dt;
  if (M[KEY_RANDOM]() < dt * 2.5) flick = rnd(.05, .25);
  const lowering = view == STATE_OFFICE && va > 0 && va < .97;
  const officeAction = view == STATE_OFFICE && (pr('L') || pr('R') || pr('1') || pr('2'));
  if ((d.t > dt && (lowering || officeAction)) || d.t > d.max) {
    const tablet = lowering ? va : 0;
    lose(d.why, d.hint, d.side);
    scareTablet = tablet; scrDelay = 0; screamUpdate();
  }
}

// =====================================================================
// AUDIO CUES & SUSPENSE (everything is heard from the chair)
// =====================================================================
function audible(e) {
  const h = HOP[e.r];
  if (h == 1) { const d = ADOOR.find((q) => CDOOR[q].adj == e.r); return 0.3 + 0.5 * clamp(1 - dist(e.x, e.y, ...blindPt(d)) / 400, 0, 1); }
  return [1, 0, 0.12, 0.03, 0.01][h] ?? 0; // far away you hear nothing at all
}
function audioCues(dt) {
  // no music that rises when danger is near: the dread only follows the clock and your sleepiness
  const d = M.max(0.15 + (now / nightLen) * 0.25, (sueno - 80) / 25);
  dread = lerp(dread, clamp(d, 0, 1), 1 - M.pow(0.2, dt));
  flick -= dt;
  if (flick < -6 && M[KEY_RANDOM]() < dt * 0.06) flick = rnd(0.1, 0.35);
  if (!AC) return;
  muffle[AUDIO_FREQUENCY][AUDIO_SET_TARGET_AT_TIME](9000 - sueno * 60, AC[AUDIO_CURRENT_TIME], 0.2);
  fanG[AUDIO_GAIN][AUDIO_SET_TARGET_AT_TIME](blackout ? 0 : view == STATE_OFFICE ? 0.12 : 0.047, AC[AUDIO_CURRENT_TIME], 0.4);
  droneG[AUDIO_GAIN][AUDIO_SET_TARGET_AT_TIME](0.012 + dread * 0.09, AC[AUDIO_CURRENT_TIME], 0.4);
  droneF[AUDIO_FREQUENCY][AUDIO_SET_TARGET_AT_TIME](90 + dread * 600, AC[AUDIO_CURRENT_TIME], 0.4);
  for (const k in E) {
    const e = E[k];
    if ((e.snd -= dt) > 0) continue;
    const v = audible(e), st = e.st == 'DOOM' ? e.ps : e.st; // sounds as if still on the way
    if (k == STATE_PITCHER) {
      if (st == STATE_PITCH) {
        if (pitchOn && e.bar < 0.35) { sfxBabble(v * (1.6 - e.bar * 2), 420 + (0.35 - e.bar) * 400); e.snd = 0.5 + e.bar * 2; } // "eh... eh..."
        else { if (pitchOn) sfxBabble(v * 0.8, 300); e.snd = rnd(0.6, 1.4); }
      } else if (st == 'SEARCH') { sfxBabble(v * 1.3, 380); e.snd = 0.9; }
      else if (st == STATE_FRONT) { sfxBabble(0.9, 480); e.snd = rnd(0.5, 0.9); } // right in your hallway: questions
      else e.snd = 1;
    } else if (k == STATE_SLEEPER) {
      if (st == STATE_SLEEP) { sfxSnore(v); e.snd = 2.8; }
      else if (st == STATE_FRONT) { sfxSnore(1.1); e.snd = 2.6; } // standing in your hallway, snoring
      else e.snd = 2;
    } else if (k == STATE_MENTORA) {
      if (!mentoraOn) e.snd = 5;
      else if (st == STATE_APPROACH && !e.kd) { sfxStep(v * 1.6); tone(2400, 0.03, 'q', 0.04 * v); e.snd = 0.2; } // fast heels
      else { sfxMurmur(v * 0.7); e.snd = rnd(2.5, 4.5); }
    } else if (k != STATE_CODER) { if (st == 'SEAT') sfxType(v * 0.4); e.snd = st == 'SEAT' ? rnd(0.4, 1) : 1; } // the team
    else if (st == 'TYPE') { sfxType(v * 0.6); e.snd = rnd(0.3, 0.8); }
    else e.snd = 1;
  }
  // breathing right behind an open side door, from the moment each one got there
  for (const k in E) {
    const e = E[k];
    if (e.kd && e.kd != 'N' && !doorClosed(e.kd) && (e.bt -= dt) <= 0) { e.bt = 3.2; sfxBreath(0.8); }
  }
  if ((scareT -= dt) <= 0) { scareT = rnd(16, 34); sfxFar(); }
  if (dread > 0.35 && (heartT -= dt) <= 0) { sfxHeart(dread); heartT = lerp(1.1, 0.42, dread); }
}

// =====================================================================
// RENDER
// =====================================================================
const tick = (f) => ((now * f) | 0) % 2;
function render(dt) {
  const camMode = view == 'cams' && va >= 1;
  rC[DRAW_SET_VISIBLE](camMode); oC[DRAW_SET_VISIBLE](!camMode);
  if (camMode) renderCam(camR); else renderOffice(dt);
  renderHud(dt);
  litA = camLit ? (litA < 0.05 ? 0.6 : M.min(1, litA + dt * 6)) * (M[KEY_RANDOM]() < 0.04 ? 0.7 : 1) : M.max(0, litA - dt * 10);
  if (FX) Object[KEY_ASSIGN](FX, {
    nv: +camMode, lit: litA, amb: AMB[camR], of: +!camMode,
    no: (camMode ? 0.1 : 0.03) + statA * 0.5 + blackout * 0.05,
    ab: dread * 1.2 + (sueno > 70) * 0.4,
    dk: 0.2 + sueno / 170 + dread * 0.3,
    wp: M.max(0, (sueno - 85) / 15),
  });
}
function renderCam(r) {
  const p = E.pitcher, R = ROOMS[r];
  // FNAF-style slow pan: drift to one side, hold, drift back
  const ph = (now * 0.12 + r * 0.37) % 2;
  rC.x = -(CAMW - W) * clamp(((ph < 1 ? ph : 2 - ph) - 0.15) / 0.7, 0, 1);
  setCam(R[9]);
  bgImg[DRAW_SET_TEXTURE]('room' + r);
  if (fgImg[DRAW_SET_VISIBLE](!!FG[r]).visible) fgImg[DRAW_SET_TEXTURE]('room' + r + 'f');
  dynG[DRAW_CLEAR](); emG[DRAW_CLEAR](); askG[DRAW_CLEAR]();
  for (const o of [projTxt, askTxt, lensImg, zR, ...Object.values(eImg)]) o[DRAW_SET_VISIBLE](false);
  const pts = (a) => a.map((q) => { const v = P(...q) || [0, 0]; return { x: v[0], y: v[1] }; });
  // your doors, rolling down, as seen from the corner rooms
  for (const d of SIDES) if (r == CDOOR[d].adj && doorP[d] > 0.02) {
    const [, s, o] = R[10].find((x) => x[0] == CTRL);
    dynG[DRAW_FILL_STYLE](0x5a5f66)[DRAW_FILL_POINTS](pts(wq(R, s, o - 50, o + 50, 165 * (1 - doorP[d]), 165)), true);
  }
  // the coder's power strip blinks while he is plugged in
  const b = plug == r && P(600, 255, 80);
  if (b) emG[DRAW_FILL_STYLE](tick(4) ? 0x44ff66 : 0x117722)[DRAW_FILL_RECT](b[0] - 6, b[1] - 6, 12, 12);
  if (r == 1) {
    // the projector screen
    const q = p.st != STATE_PITCH, t = P(350, 0, 158);
    dynG[DRAW_FILL_STYLE](q ? 0xffffff : 0xf4f1e0)[DRAW_FILL_POINTS](pts(wq(R, 'N', 210, 490, 108, 200)), true);
    if (t) projTxt[DRAW_SET_VISIBLE](true)[DRAW_SET_POSITION](t[0], t[1])[DRAW_SET_SCALE](t[2] * 1.6)[DRAW_SET_TEXT](q ? '¿PREGUNTAS?' : 'DIAPOSITIVA ' + p.slide)[DRAW_SET_COLOR](q ? '#c00' : '#222');
  }
  // people in the shot, far to near
  const order = [];
  for (const k in eImg) {
    const chef = k == 'chef';
    const e = chef ? KITCHEN_CHEF : E[k], im = eImg[k];
    const q = (k != STATE_MENTORA || mentoraOn) && e.r == r && !blindDoor(e) && P(e.x, e.y, 0);
    if (!q) continue;
    const [sx, sy, s] = q, sc = 7 * s, lying = k == STATE_SLEEPER && e.st == STATE_SLEEP;
    const unplugged = k == STATE_CODER && e.st == 'WAIT';
    const sh = unplugged ? 1.8 * sc * M.sin(e.anim * 95) : e.shake ? e.shake * sc * rnd(-1, 1) : 0;
    const tilt = unplugged ? .10 * M.sin(e.anim * 77) : 0;
    im[DRAW_SET_VISIBLE](true)[DRAW_SET_SCALE](sc).setFlipX(e.fx < 0)[DRAW_SET_ROTATION](lying ? -PI / 2 : tilt)[DRAW_SET_ORIGIN](0.5, lying ? 0.5 : 1)[DRAW_SET_POSITION](sx + sh, sy - (lying ? 10 * sc : 0));
    im[DRAW_SET_TINT](chef || (k == STATE_CODER && !coderOn) ? 0x888888 : 0xffffff);
    im.depth = -cs(e.x, e.y, 0)[2]; im.hx = sx; im.hy = sy - (lying ? 6 : 19) * sc; im.sc = sc;
    order[KEY_PUSH](im);
  }
  rC[DRAW_BRING_TO_TOP](dynG); rC[DRAW_BRING_TO_TOP](projTxt);
  order.sort((a, c) => a.depth - c.depth)[KEY_FOR_EACH]((im) => rC[DRAW_BRING_TO_TOP](im));
  rC[DRAW_BRING_TO_TOP](fgImg);
  if (camLit) hallu = 0;
  if (hallu > 0) {
    // a split-second face on the camera (FNAF2 style), then static
    if ((hallu -= 1 / 60) <= 0) { statA = 1; sfxStatic(0.3); }
    lensImg[DRAW_SET_VISIBLE](true)[DRAW_SET_TEXTURE](pick(ROLES) + 'H')[DRAW_SET_SCALE](26)[DRAW_SET_POSITION](W / 2 - rC.x + rnd(-8, 8), H / 2 + rnd(-8, 8));
    rC[DRAW_BRING_TO_TOP](lensImg);
  }
  rC[DRAW_BRING_TO_TOP](emG);
  const pi = eImg.pitcher;
  if (pitchOn && p.st == STATE_PITCH && p.bar < 0.35 && pi.visible) {
    // speech bubble: he wants the next slide
    const kk = 1 - p.bar / 0.35, bx = pi.hx + 140 + (M[KEY_RANDOM]() - 0.5) * kk * 8, by = pi.hy - 40;
    askG[DRAW_FILL_STYLE](0xffffff)[DRAW_FILL_ROUNDED_RECT](bx - 110, by - 22, 220, 34, 8).fillTriangle(bx - 100, by + 12, bx - 80, by + 12, bx - 112, by + 26);
    rC[DRAW_BRING_TO_TOP](askG);
    askTxt[DRAW_SET_VISIBLE](true)[DRAW_SET_POSITION](bx, by - 5)[DRAW_SET_TEXT](kk > 0.6 ? '¡¡SIGUIENTE!!' : '¿SIGUIENTE DIAPOSITIVA?')[DRAW_SET_COLOR](kk > 0.6 ? '#c00' : '#111')[DRAW_SET_SCALE](1 + kk * 0.25);
    rC[DRAW_BRING_TO_TOP](askTxt);
  }
  const si = eImg.sleeper;
  if (si.visible) rC[DRAW_BRING_TO_TOP](zzz(zR, E.sleeper, si.hx, si.hy, si.sc / 5));
}
// floating z's over the sleeper (yellow when he stirs, red !! when he is angry)
function zzz(t, s, x, y, k) {
  const a = s.st == 'ANGRY', w = s.st == STATE_FRONT && s.warn, b = (now * 0.8) % 1;
  return t[DRAW_SET_VISIBLE](true)[DRAW_SET_TEXT](a ? '!!' : w ? 'z ?' : s.st == STATE_SLEEP ? 'z Z' : 'z')[DRAW_SET_COLOR](a ? '#ff4040' : w ? COLOR_FFD400 : '#9fd8ff')[DRAW_SET_POSITION](x + (6 + b * 8) * k, y - b * 22 * k)[DRAW_SET_ALPHA](1 - b)[DRAW_SET_SCALE](k);
}
function renderOffice() {
  const fl = flick > 0 || blackout, pts = (a) => a.map(([x, y]) => ({ x, y }));
  oC.x = -pan; oC.y = M.sin(now * 0.7) * 1.5; // breathing
  oDesk.x = -(pan - (PW - W) / 2) * DESK_PX;
  oDim[DRAW_CLEAR](); oTop[DRAW_CLEAR](); oDG[DRAW_CLEAR]();
  oG[DRAW_SET_VISIBLE](!!light && !doorClosed(focus));
  if (oG.visible) oG[DRAW_SET_TEXTURE]('passage' + focus).setX(ODOOR[focus][0]);
  zO[DRAW_SET_VISIBLE](false);
  for (const k in E) {
    const e = E[k], im = oImg[k], bd = blindDoor(e);
    im[DRAW_SET_VISIBLE](false);
    // The eyelid overlay covers the sprite naturally during a blink.
    if (!light || !e.kd || bd != e.kd || bd != focus || doorClosed(bd)) continue;
    // People stand in the corridor behind the doorway: the wall layer drawn
    // over them hides whatever is outside the opening. At the side doors they
    // peek around the frame (FNAF1 Bonnie & Chica): leaning in, head and a
    // shoulder showing, the rest of the body behind the wall.
    let sx = PCX, sy = 476, sc = 10, rot = 0;
    if (bd != 'N') {
      const west = bd == 'W';
      sc = 13.2; sx = west ? 94 : PW - 94; sy = wBot(sx) + 4;
      rot = (west ? 1 : -1) * (.2 + M.sin(now * 1.3) * .02);
    }
    im[DRAW_SET_VISIBLE](true)[DRAW_SET_SCALE](sc)[DRAW_SET_ROTATION](rot)[DRAW_SET_POSITION](sx + (e.shake ? (M[KEY_RANDOM]() - 0.5) * e.shake * 10 : 0), sy)
      .setFlipX(rot ? rot < 0 : e.fx < 0)[DRAW_SET_TINT](0xffffff);
    im.setCrop(); oC.moveBelow(im, oMask);
  }
  // The sleepwalker's z's float out of the front hallway.
  const s = E.sleeper;
  if (s.kd == 'N' && !blackout) zzz(zO, s, PCX - 10, 400, 1.6);
  // the shutters roll down inside the doorways, with a hazard stripe at the bottom edge
  for (const d of SIDES) {
    const q = doorP[d];
    if (q < 0.01) continue;
    const r = dq(d, q), [a, b] = DX[d];
    oTop[DRAW_FILL_STYLE](0x4b4f57)[DRAW_FILL_POINTS](pts(r), true)[DRAW_LINE_STYLE](3, 0x30333a);
    for (let j = 1; j < 9; j++) { const k = j / 9; oTop[DRAW_LINE_BETWEEN](a, lerp(r[0][1], r[3][1], k), b, lerp(r[1][1], r[2][1], k)); }
    oTop[DRAW_FILL_STYLE](0xd4a017)[DRAW_FILL_POINTS](pts([[a, r[3][1] - 14], [b, r[2][1] - 14], [b, r[2][1]], [a, r[3][1]]]), true);
  }
  // button panels: door (red) and light (white); the hallway only has a light.
  // The panel you are facing is softly lit.
  for (const d of ADOOR) {
    const [bx, by] = OPANEL[d], h = d == 'N' ? 60 : 110, ly = by + (d == 'N' ? 30 : 80);
    if (focus == d && !blackout) oTop[DRAW_FILL_STYLE](0xffe9a0, 0.07)[DRAW_FILL_ROUNDED_RECT](bx - 14, by - 14, 68, h + 28, 10);
    if (d != 'N') oTop[DRAW_FILL_STYLE](blackout ? 0x220000 : doors[d] ? 0xff2a2a : 0x6a1010)[DRAW_FILL_CIRCLE](bx + 20, by + 30, 14);
    oTop[DRAW_FILL_STYLE](blackout ? 0x111111 : light && focus == d ? 0xffffee : 0x55554e)[DRAW_FILL_CIRCLE](bx + 20, ly, 14);
  }
  // the wall clock keeps the time
  const hr = hourOf(now), fr = (now % hl) / hl, ha = ((hr + fr) / 12) * PI * 2 - PI / 2, ma = fr * PI * 2 - PI / 2;
  oTop[DRAW_LINE_STYLE](5, 0x111111)[DRAW_LINE_BETWEEN](CLOCK[0], CLOCK[1], CLOCK[0] + M.cos(ha) * 20, CLOCK[1] + M.sin(ha) * 20)[DRAW_LINE_STYLE](3, 0x111111)[DRAW_LINE_BETWEEN](CLOCK[0], CLOCK[1], CLOCK[0] + M.cos(ma) * 30, CLOCK[1] + M.sin(ma) * 30);
  // ---- the desk ----
  // the fan (it stops when the power goes), the monitor, the coffee maker
  fanS = lerp(fanS, blackout ? 0 : 24, 0.02); fanA += fanS / 60;
  oDG[DRAW_FILL_STYLE](0x3a3a3e)[DRAW_FILL_CIRCLE](FAN[0], FAN[1], 34)[DRAW_FILL_STYLE](0x6a6d74);
  for (let i = 0; i < 3; i++) { const a = fanA + i * 2.094; oDG.fillTriangle(FAN[0], FAN[1], FAN[0] + M.cos(a) * 32, FAN[1] + M.sin(a) * 32, FAN[0] + M.cos(a + 0.7) * 32, FAN[1] + M.sin(a + 0.7) * 32); }
  oDG[DRAW_FILL_STYLE](0x111111)[DRAW_FILL_CIRCLE](FAN[0], FAN[1], 6)[DRAW_LINE_STYLE](2, 0x222226)[DRAW_STROKE_CIRCLE](FAN[0], FAN[1], 34);
  if (!blackout) {
    oDG[DRAW_FILL_STYLE](0x2a5a90, 0.185)[DRAW_FILL_RECT](CRT_X + 10, 356, 108, 70);
    for (let i = 0; i < 4; i++) oDG[DRAW_FILL_STYLE](0x9ab, 0.12)[DRAW_FILL_RECT](CRT_X + 14, 358 + ((now * 40 + i * 17) % 66), 100, 2);
  }
  const fill = cof == 1 ? 1 - cofT / BREW : cof / 2;
  oDG[DRAW_FILL_STYLE]([0x331111, 0xff3322, 0x33ff55][cof])[DRAW_FILL_RECT](COFFEE_X + 16, 412, 6, 6);
  if (drink <= 0) oDG[DRAW_FILL_STYLE](0xe8e2c8)[DRAW_FILL_RECT](COFFEE_X - 12, 448, 24, 22)[DRAW_FILL_STYLE](0x5a3416)[DRAW_FILL_RECT](COFFEE_X - 10, 468 - 18 * fill, 20, 18 * fill);
  if (cof == 1) oDG[DRAW_FILL_RECT](COFFEE_X - 1, 446, 2, 20 - 18 * fill);
  if (cof > 1) for (let i = 0; i < 3; i++) oDG[DRAW_FILL_STYLE](0xdddddd, 0.3)[DRAW_FILL_CIRCLE](COFFEE_X + M.sin(now * 3 + i) * 6, 440 - ((now * 30 + i * 12) % 40), 5);
  deskImg[DRAW_SET_TINT](blackout ? 0x2a2a2a : fl ? 0x6a6a6a : 0xd8d8d8);
  // light and darkness
  oBeam[DRAW_SET_VISIBLE](!!light);
  if (light) {
    const [x, y, w, h] = ODOOR[focus], tx = x + w / 2, ty = y + h * 0.55;
    oBeam[DRAW_SET_POSITION](PCX, 570)[DRAW_SET_ROTATION](M.atan2(ty - 570, tx - PCX))[DRAW_SET_SCALE](dist(PCX, 570, tx, ty) / 230, 1)[DRAW_SET_ALPHA](0.24);
  }
  const sw = M.sin(now * 0.9) * 0.12;
  oLamp[DRAW_SET_ROTATION](PI / 2 + sw)[DRAW_SET_ALPHA](fl ? 0.02 : 0.145)[DRAW_SET_POSITION](PCX + sw * 60, 40);
  oDim[DRAW_FILL_STYLE](0, blackout ? 0.85 : fl ? 0.6 : 0.3)[DRAW_FILL_RECT](0, 0, PW, H)[DRAW_FILL_STYLE](0, 0.3)[DRAW_FILL_RECT](0, 0, 60, H)[DRAW_FILL_RECT](PW - 60, 0, 60, H);
}

// ---- HUD ----
function hideHud() {
  uHud[DRAW_SET_VISIBLE](false); uG[DRAW_CLEAR](); uStat[DRAW_SET_ALPHA](0);
  uLid.height = uLid2.height = 0; uZ[DRAW_SET_VISIBLE](false);
  uScr[DRAW_SET_VISIBLE](false); uScrT[DRAW_SET_TEXT]('');
}
// hide the HUD text but keep the eyelids and the static (scares, falling asleep)
function hudOff() { for (const o of [uPow, uHour, uNight, uSue, uCamBar, uWarn, uMsg, uTab, uMug, uTh, uLearn, uPauseHint, ...uPr, ...uCam, ...uMapT]) o[DRAW_SET_VISIBLE](false); uG[DRAW_CLEAR](); }
function prompt(i, x, y, s, col, a) { uPr[i][DRAW_SET_VISIBLE](true)[DRAW_SET_TEXT](s)[DRAW_SET_POSITION](clamp(x, 80, 720), clamp(y, 20, 560))[DRAW_SET_COLOR](col || COLOR_FFF)[DRAW_SET_ALPHA](a ?? 1); }
function drawTablet(progress) {
  const k = progress * progress * (3 - 2 * progress);
  uTab[DRAW_SET_VISIBLE](progress > 0 && progress < 1)[DRAW_SET_POSITION](W / 2, H - (H + 2) * k)
    [DRAW_SET_SCALE](1.10 - .10 * k, .48 + .52 * k)[DRAW_SET_ANGLE](5 * (1 - k));
}
function mapLink(gr, a, b, ox, oy, scale) {
  const A = ROOMS[a][4], B = b == CTRL ? OFFICE_MAP : ROOMS[b][4];
  const [ax, ay] = mapC(a), [bx, by] = mapC(b);
  const line = (x1, y1, x2, y2) => {
    if (x1 != x2 || y1 != y2) gr[DRAW_LINE_BETWEEN](ox + x1 * scale, oy + y1 * scale, ox + x2 * scale, oy + y2 * scale);
  };
  if (A[0] < B[0] + B[2] && A[0] + A[2] > B[0]) {
    const y1 = ay < by ? A[1] + A[3] : A[1];
    const y2 = ay < by ? B[1] : B[1] + B[3];
    const turn = (y1 + y2) / 2;
    line(ax, y1, ax, turn); line(ax, turn, bx, turn); line(bx, turn, bx, y2);
  } else {
    const x1 = ax < bx ? A[0] + A[2] : A[0];
    const x2 = ax < bx ? B[0] : B[0] + B[2];
    const turn = (x1 + x2) / 2;
    line(x1, ay, turn, ay); line(turn, ay, turn, by); line(turn, by, x2, by);
  }
}
function renderHud(dt) {
  const gr = uG, p = E.pitcher, office = view == STATE_OFFICE, cm = !office && va >= 1;
  gr[DRAW_CLEAR]();
  uPr[KEY_FOR_EACH]((t) => t[DRAW_SET_VISIBLE](false));
  uHour[DRAW_SET_TEXT]((hourOf(now) || 12) + ' AM');
  uNight[DRAW_SET_TEXT]('NOCHE ' + night);
  uPow[DRAW_SET_TEXT]('BATERÍA: ' + M.ceil(power) + '%\nUSO:');
  if (!blackout) { const u = M.min(usage, 5); for (let i = 0; i < 5; i++) gr[DRAW_FILL_STYLE](i < u ? (i < 2 ? 0x44dd66 : i < 4 ? 0xeecc33 : 0xee4444) : 0x222222)[DRAW_FILL_RECT](HUD_INSET + 46 + i * 20, HUD_BATTERY_Y + 24, 16, 14); }
  const sleepY = HUD_BATTERY_Y - 20;
  gr[DRAW_FILL_STYLE](0x1a1430)[DRAW_FILL_RECT](HUD_INSET, sleepY, 150, 10)
    [DRAW_FILL_STYLE](sueno > 70 ? 0xb44dff : 0x7a5cff)[DRAW_FILL_RECT](HUD_INSET, sleepY, 150 * clamp(sueno / 100, 0, 1), 10);
  uSue[DRAW_SET_TEXT](sueno > 70 ? 'SUEÑO ¡¡CAFÉ!!' : 'SUEÑO')[DRAW_SET_COLOR](sueno > 70 && M.sin(now * 8) > 0 ? '#ff77ff' : COLOR_C9B6FF);
  drawTablet(va);
  for (const t of [...uCam, ...uMapT]) t[DRAW_SET_VISIBLE](cm);
  if (cm) {
    uCam[0][DRAW_SET_TEXT]('CAM ' + ROOMS[camR][1] + ' · ' + ROOMS[camR][0]);
    uCam[1][DRAW_SET_ALPHA](tick(2));
    uCam[2][DRAW_SET_TEXT](clockStr(now));
    gr[DRAW_LINE_STYLE](2, 0xd8d0c0, 0.35).strokeRect(20, 20, 760, 560);
    // the map: rooms and the corridors between them, your office at the bottom
    const MX = 532, MY = 352, K = 0.78; // map origin and scale
    gr[DRAW_FILL_STYLE](0, .72)[DRAW_FILL_RECT](MX - 8, MY - 8, 252, 208)[DRAW_LINE_STYLE](2, 0xabad9e);
    for (let i = 0; i < CTRL; i++) for (const n of NB[i]) if (n > i) mapLink(gr, i, n, MX, MY, K);
    const m = E.mentora;
    for (let i = 0; i <= CTRL; i++) {
      const [x, y, w, h] = (i == CTRL ? OFFICE_MAP : ROOMS[i][4]).map((v, j) => v * K + (j ? j < 2 ? MY : 0 : MX));
      const selected = i == camR, speaker = m.st == STATE_CALL && i == m.target;
      const fill = speaker ? (tick(4) ? 0x68468c : 0x392747) : selected ? CAMERA_SELECTED_COLOR : i == CTRL ? 0x2a2a2a : 0x161a16;
      gr[DRAW_FILL_STYLE](fill)[DRAW_FILL_RECT](x, y, w, h)
        [DRAW_LINE_STYLE](selected ? 2 : 1.5, selected && speaker ? 0x9cb55a : 0xd1d3c6).strokeRect(x, y, w, h);
      uMapT[i][DRAW_SET_POSITION](x + w / 2, y + h / 2)[DRAW_SET_COLOR](speaker ? '#f4dfff' : selected ? '#0e1500' : '#eceee3')
        [DRAW_SET_TEXT](i == CTRL ? 'TÚ' : speaker ? 'ALTAVOZ' : ROOMS[i][1]);
      if ((m.st == STATE_CALL || m.st == STATE_APPROACH) && m.r == i) gr[DRAW_FILL_STYLE](0xc77dff)[DRAW_FILL_CIRCLE](x + 4, y + 4, 3);
      if (i == 1 && pitchOn && (p.bar < .35 || p.st != STATE_PITCH) && tick(4)) {
        gr[DRAW_FILL_STYLE](0xff3344)[DRAW_FILL_RECT](x + w - 9, y + 3, 6, 6);
      }
    }
    if (camR == 1 && pitchOn) {
      // FNAF2 music box style: a fixed pie timer on the camera UI
      const b = p.r == 1 ? p.bar : 0, urgent = b < 0.35, cx = 92, cy = 150, gone = p.r != 1;
      gr[DRAW_FILL_STYLE](0, 0.7)[DRAW_FILL_CIRCLE](cx, cy, 44)[DRAW_FILL_STYLE](0x2a2620)[DRAW_FILL_CIRCLE](cx, cy, 36);
      if (b > 0.005) gr[DRAW_FILL_STYLE](urgent ? (tick(4) ? 0xff3344 : 0xffd400) : 0xe8dcb0)[DRAW_BEGIN_PATH]().slice(cx, cy, 36, -PI / 2, -PI / 2 + b * PI * 2).fillPath();
      gr[DRAW_LINE_STYLE](2, 0xd8d0c0)[DRAW_STROKE_CIRCLE](cx, cy, 36);
      if (gone) prompt(0, cx + 110, cy + 66, '¡SE FUE A BUSCAR PÚBLICO!', '#ff5555');
      else if (!learned('slide', 2)) prompt(0, cx + 110, cy + 66, 'MANTÉN B2 · PASAR DIAPOSITIVAS', urgent ? COLOR_FFD400 : COLOR_FFF);
    } else if (camR == 0 && plug >= 0) {
      prompt(0, 240, 120, cutH > 0 ? 'CORTANDO...' : 'MANTÉN B2 · CORTAR SU ENCHUFE', '#ff8888');
      gr[DRAW_FILL_STYLE](0xff8888)[DRAW_FILL_RECT](190, 134, 100 * cutH / 1.2, 5);
    }
  }
  const sl = E.sleeper;
  const teachLight = cm && !litN;
  const teachTablet = office && night == 1 && !lesson.tabletOpened && modeT >= 7;
  uLearn[DRAW_SET_VISIBLE](!blackout && !doomed && (teachLight || teachTablet));
  if (uLearn.visible) {
    const pulse = .5 + .5 * M.sin(modeT * 4);
    uLearn[DRAW_SET_TEXT](teachLight ? 'MANTÉN B1 · ENCIENDE LA LINTERNA' : 'PULSA B3 · LEVANTA LA TABLETA')
      [DRAW_SET_ALPHA](.7 + .3 * pulse)[DRAW_SET_SCALE](1 + .045 * pulse);
  }
  if (cm && sl.kd == 'N') prompt(2, 400, 538, sl.warn ? 'z ?' : 'z  z  z', sl.warn ? COLOR_FFD400 : '#9fd8ff', 0.5 + M.sin(now * 3) * 0.3);
  uCamBar[DRAW_SET_VISIBLE](office)[DRAW_SET_ALPHA](blackout ? 0.35 : 1);
  // warning sign next to the camera bar when the pitcher is about to lose it
  const mr = E.mentora.st == STATE_APPROACH && E.mentora.side, pg = pitchOn && p.st != STATE_PITCH; // she is running to that door · he left the stage
  uWarn[DRAW_SET_VISIBLE](office && !blackout && !(light && mr == focus) && (mr || pg || (pitchOn && p.bar < 0.35)))[DRAW_SET_ALPHA](tick(3) ? 1 : 0.3)[DRAW_SET_COLOR](mr ? '#c77dff' : pg ? '#ff3344' : COLOR_FFD400)[DRAW_SET_POSITION](mr ? (mr == 'W' ? 40 : 760) : 560, mr ? 300 : 580);
  if (office && !blackout && drink <= 0) {
    if (CDOOR[focus]) {
      // FNAF-style: the hints live inside the doorway you are looking at
      const [x, y, w, h] = ODOOR[focus], cx = x + w / 2 - pan, closed = doors[focus], a = learned('door') && learned('light') ? 0.55 : 1;
      if (!light && focus != 'N') prompt(0, cx, y + h * 0.35, 'B2 · ' + (closed ? 'ABRIR' : 'CERRAR') + ' PUERTA', closed ? '#ff8888' : COLOR_FFF, a);
      if (!light && !closed) prompt(1, cx, y + h * 0.35 + 34, 'B1 · LUZ', '#ffe9a0', a);
    } else if (focus == 'C') {
      const cx = COFFEE_X + oDesk.x - pan;
      prompt(0, cx, 372, ['MANTÉN B1 · PREPARAR CAFÉ', 'PREPARANDO... ' + M.ceil(cofT), 'B1 · TOMAR CAFÉ'][cof], cof > 1 ? '#7f7' : COLOR_C9B6FF);
      gr[DRAW_FILL_STYLE](0xc9b6ff)[DRAW_FILL_RECT](cx - 50, 386, 100 * cofHold / 0.6, 5);
    }
  }
  const mentor = E.mentora;
  let cue = '';
  if (mentor.st == STATE_CALL) {
    const room = ROOMS[mentor.target];
    cue = cm && camR == mentor.target ? 'B2 · ACTIVAR INTERCOMUNICADOR' :
      (cm ? 'BUSCA LA SALA MORADA · ' : 'B3 · BUSCA EL ALTAVOZ EN ') + room[0] + ' · CAM ' + room[1];
  } else if (mentor.st == STATE_APPROACH && !(office && light && mentor.side == focus)) cue = 'MENTORA · PUERTA ' + (mentor.side == 'W' ? 'IZQUIERDA' : 'DERECHA');
  else if (plug >= 0 && (!cm || camR != 0)) cue = 'CONSUMO EXTRA · ENCHUFE EN CAM 1A';
  else if (night == 1 && E.fe.kd && !lesson[KEY_BLOCKED] && !(office && light && focus == 'W')) {
    cue = doors.W ? 'ESPERA A QUE SE ALEJE' : cm ? 'B3 · BAJA LA CÁMARA. HAY PASOS A LA IZQUIERDA.' :
      focus != 'W' ? '◄ GIRA HACIA LOS PASOS' : E.fe.revealed ? 'B2 · CIERRA LA PUERTA IZQUIERDA' : 'B1 · ILUMINA EL MARCO';
  } else if (night == 3 && now > 5 && now < 18 && !learned('slide', 2) && (!cm || camR != 1)) cue = 'EL PROYECTOR SIGUE ENCENDIDO · CAM 1C';
  if (cue && !blackout && !doomed) prompt(3, 400, 85, cue, mentor.st == STATE_CALL ? '#f5c6ff' : '#ffe6a2');
  // static flickers when someone moves on the camera you are watching
  statA = M.max(0, statA - dt * 2.2);
  uStat[DRAW_SET_ALPHA](clamp(statA * 0.9 + blackout * 0.03, 0, 1))[DRAW_SET_TILE_POSITION](rnd(0, 200), rnd(0, 150));
  uMsg[DRAW_SET_ALPHA](clamp((msgT -= dt) * 2, 0, 1));
  uTh[DRAW_SET_VISIBLE](!!thought && office);
  if (thought) uTh[DRAW_SET_TEXT](thought.s)[DRAW_SET_POSITION](400, 548)[DRAW_SET_ALPHA](clamp(thought.t * 3, 0, 1));
  // eyelids hang lower the sleepier you are; blinks close them all the way
  const bl = blink > 0 ? M.sin(clamp(1 - blink / blinkDur, 0, 1) * PI) : 0;
  lidY = lerp(lidY, clamp((sueno - 45) / 55, 0, 1) * (150 + M.sin(now * 1.3) * 18), 1 - M.pow(0.1, dt));
  const lh = M.max(lidY, bl * 310);
  uLid.height = uLid2.height = lh; uLid2.y = H - lh;
  uMug[DRAW_SET_VISIBLE](drink > 0);
  if (drink > 0) { const k = 1 - drink / SIP, h = M.min(1, k * 5, drink * 3), e = h * h * (3 - 2 * h); uMug.setY(H + 250 - e * 330)[DRAW_SET_ANGLE](-28 * clamp(k * 2 - 0.4, 0, 1) * e); }
}

// =====================================================================
// LOSE / WIN
// =====================================================================
// [sprite, scream, what went wrong]
const LOSE = arcadeData.losses;
// pitch of each one's scream
const SCRP = arcadeData.scarePitch;
function lose(why, hint, side) {
  if (mode != STATE_PLAY) return;
  if (FX) S[KEY_CAMERAS].main.hasPostPipeline = false;
  scareTablet = 0;
  if (AC) { buzzG[AUDIO_GAIN][AUDIO_VALUE] = fanG[AUDIO_GAIN][AUDIO_VALUE] = 0; ambG[AUDIO_GAIN][AUDIO_SET_TARGET_AT_TIME](0, AC[AUDIO_CURRENT_TIME], 0.08); droneG[AUDIO_GAIN][AUDIO_SET_TARGET_AT_TIME](0, AC[AUDIO_CURRENT_TIME], 0.08); } // half a second of silence
  lostTo = why; lostHint = hint || LOSE[why][2]; loseT = now; scrOn = 0; scrSide = side || 0;
  mode = 'scream'; modeT = 0; light = camLit = 0;
  if (why == 'sleep') { uLid.height = uLid2.height = 310; uLid2.y = H - 310; scrDelay = 0.3; scrPre = 0; uTh[DRAW_SET_VISIBLE](false); }
  else if (why == 'power') {
    va = 0; scrDelay = 0; scrPre = false;
  }
  else {
    // the tablet drops... and sometimes you get a split second to see it standing
    // right in front of you in the dark. Sometimes you don't.
    view = STATE_OFFICE; va = 0; rC[DRAW_SET_VISIBLE](false); oC[DRAW_SET_VISIBLE](true); hudOff(); uStat[DRAW_SET_ALPHA](0);
    scrPre = M[KEY_RANDOM]() < 0.7; scrDelay = scrPre ? rnd(0.45, 0.85) : rnd(0.05, 0.2);
  }
  uScr[DRAW_SET_TEXTURE](LOSE[why][0] + '0')[DRAW_SET_VISIBLE](false);
}
// Falling asleep: your eyes close, the building goes quiet, your own z's
// float up... then you open your eyes and something is standing right in
// front of you. Eyes shut again. Then it gets you.
function doze() {
  mode = 'doze'; modeT = 0; loseT = now; dozeHB = 0; camLit = 0; if (AC) buzzG[AUDIO_GAIN][AUDIO_VALUE] = fanG[AUDIO_GAIN][AUDIO_VALUE] = 0;
  view = STATE_OFFICE; va = 0; light = 0; rC[DRAW_SET_VISIBLE](false); oC[DRAW_SET_VISIBLE](true);
  hudOff(); uStat[DRAW_SET_ALPHA](0);
  if (AC) { const t = AC[AUDIO_CURRENT_TIME]; ambG[AUDIO_GAIN][AUDIO_SET_TARGET_AT_TIME](0, t, 0.8); droneG[AUDIO_GAIN][AUDIO_SET_TARGET_AT_TIME](0, t, 0.8); muffle[AUDIO_FREQUENCY][AUDIO_SET_TARGET_AT_TIME](500, t, 0.6); }
  sfxYawn();
}
function dozeUpdate() {
  const t = modeT, ease = (k) => { k = clamp(k, 0, 1); return k * k * (3 - 2 * k); };
  // the eyelids: close slowly · darkness · snap open · shut again
  const lh = t < 4.6 ? lerp(lidY, 310, ease(t / 2.4)) : t < 6.3 ? 310 * (1 - ease((t - 4.6) / 0.18)) : 310 * ease((t - 6.3) / 0.15);
  uLid.height = uLid2.height = lh; uLid2.y = H - lh;
  // your own z's floating up while you drift off
  const za = t < 4.2 ? M.min(1, (t - 0.8) * 2, (4.2 - t) / 0.6) : 0;
  uZ[DRAW_SET_VISIBLE](za > 0)[DRAW_SET_TEXT](['z', 'z Z', 'z Z z'][M.min(2, ((t - 0.8) * 1.2) | 0)])[DRAW_SET_POSITION](400 + M.sin(t * 2) * 20, 330 - clamp((t - 0.8) / 3.4, 0, 1) * 120)[DRAW_SET_ALPHA](clamp(za, 0, 1));
  uTh[DRAW_SET_VISIBLE](t < 2.6)[DRAW_SET_TEXT]('Qué sueño...')[DRAW_SET_POSITION](400, 548)[DRAW_SET_ALPHA](clamp((2.6 - t) * 2, 0, 1));
  // eyes open: the office, the lights barely holding... and it is standing there
  const open = t > 4.6 && t < 6.5;
  if (open) {
    flick = M[KEY_RANDOM]() < 0.15 ? 0.1 : 0;
    renderOffice();
    oBan[DRAW_SET_TEXTURE]('banana0')[DRAW_SET_POSITION](pan + 400, 650)[DRAW_SET_SCALE](15)[DRAW_SET_TINT](0x8a8470); oC[DRAW_BRING_TO_TOP](oBan);
    if (!dozeHB) { dozeHB = 1; sfxHeart(1); tone(52, 1.6, 's', 0.12, 46); }
  }
  oBan[DRAW_SET_VISIBLE](open);
  if (t > 6.9) { mode = STATE_PLAY; lose('sleep'); }
}
function screamUpdate() {
  const t = modeT - scrDelay, sl = lostTo == 'sleep';
  if (t < 0) {
    // the moment before: silence, the lights dying... something standing there
    if (!sl && lostTo != 'power') {
      flick = M[KEY_RANDOM]() < 0.35 ? 0.2 : 0; renderOffice();
      oBan[DRAW_SET_VISIBLE](scrPre)[DRAW_SET_TEXTURE](LOSE[lostTo][0] + '0')[DRAW_SET_SCALE](19)[DRAW_SET_POSITION](pan + 400, 700)[DRAW_SET_TINT](0x34302a); oC[DRAW_BRING_TO_TOP](oBan);
    }
    return;
  }
  if (!scrOn) {
    // The UI still draws the tablet and static over the black background.
    scrOn = 1; wC[DRAW_SET_VISIBLE](false); oBan[DRAW_SET_VISIBLE](false); hudOff();
    if (AC) muffle[AUDIO_FREQUENCY][AUDIO_SET_TARGET_AT_TIME](12000, AC[AUDIO_CURRENT_TIME], 0.01);
    sfxScream(SCRP[LOSE[lostTo][0]]); S[KEY_CAMERAS].main.shake(1100, 0.04).flash(140, 255, 40, 40); uiCam.shake(1100, 0.03);
  }
  if (scareTablet > 0) {
    scareTablet = M.max(0, scareTablet - 1 / .17 * (S.game.loop.delta / 1000));
    drawTablet(scareTablet);
  }
  // Anchor the lunge at the upper torso so the viewport frames the full texture.
  const k = clamp(t / 0.16, 0, 1), e = 1 - (1 - k) ** 3, hit = t > 0.16, x0 = scrSide == 'W' ? 170 : scrSide == 'E' ? 630 : 400, a0 = scrSide == 'W' ? -28 : scrSide == 'E' ? 28 : 0;
  const x = lerp(x0, 400, e) + (hit ? rnd(-18, 18) : 0), y = lerp(scareTablet ? 140 : 420, 330, e) + (hit ? rnd(-16, 16) : 0);
  uScr[DRAW_SET_VISIBLE](t < 1.2)[DRAW_SET_SCALE](lerp(10, 38, e) + (hit ? M.sin(t * 70) * 2 : 0))
    [DRAW_SET_POSITION](x, y)[DRAW_SET_ANGLE](hit ? rnd(-7, 7) : lerp(a0, 0, e))[DRAW_SET_TINT](hit && M[KEY_RANDOM]() < 0.3 ? 0xff4040 : 0xffffff);
  uScrT[DRAW_SET_TEXT](hit && t < 1.2 ? LOSE[lostTo][1] : '')[DRAW_SET_SCALE](1 + M[KEY_RANDOM]() * 0.15)[DRAW_SET_POSITION](400 + rnd(-8, 8), 525 + rnd(-6, 6));
  uStat[DRAW_SET_ALPHA](t > 1.2 ? 1 : hit ? 0.12 + M[KEY_RANDOM]() * 0.2 : 0)[DRAW_SET_TILE_POSITION](rnd(0, 200), rnd(0, 150));
  if (t > 1.2 && scrOn == 1) { scrOn = 2; sfxStatic(1); } // cut to static
  if (t > 2.3) goLose();
}
function goLose() {
  screen('lose');
  sRect(0);
  const role = LOSE[lostTo][0], banana = role == 'banana';
  const face = img(uScreen, role + (banana ? '0' : 'H'), W / 2 + (banana ? 32 : 0), 278, 0.5, 0)
    [DRAW_SET_SCALE](22)[DRAW_SET_TINT](0x938698);
  if (banana) face.setCrop(0, 0, 24, 14);
  img(uScreen, 'lossShade', 0, 0, 0, 0);
  const grain = sAdd(S.add[KEY_TILE_SPRITE](0, 0, W, H, 'noise')[DRAW_SET_ORIGIN](0)[DRAW_SET_ALPHA](0.07));

  plainMenuHeading('PERDISTE');
  sText(TITLE_INSET + 2, 116, 'NOCHE ' + night + ' · ' + clockStr(loseT), 14, '#aaa1ad', 0, 0);
  sText(TITLE_INSET + 2, 153, lostHint, 17, '#cbc2cc', 0, 0, { fontStyle: 'normal', wordWrap: { width: 450 }, lineSpacing: 4 });
  showNightChoices('REINTENTAR', grain);
}
function winNight() {
  screen('win'); uWDone = 0;
  if (AC) { ambG[AUDIO_GAIN][AUDIO_SET_TARGET_AT_TIME](0, AC[AUDIO_CURRENT_TIME], 0.1); droneG[AUDIO_GAIN][AUDIO_SET_TARGET_AT_TIME](0, AC[AUDIO_CURRENT_TIME], 0.1); }
  sRect(0);
  uW1 = sText(400, 270, '5:59 AM', 60);
  uW2 = sText(400, 340, '', 22, COLOR_FFD400);
  if (night < 5) { saved.night = menuNight = M.max(saved.night, night + 1); writeSave(); }
}
function winUpdate() {
  if (modeT > 1.6 && !uWDone) { uWDone = 1; uW1[DRAW_SET_TEXT]('6:00 AM'); uW2[DRAW_SET_TEXT]('NOCHE ' + night + ' SUPERADA'); sfxSix(); S[KEY_CAMERAS].main.flash(300, 255, 255, 255); }
  if (modeT < 1.6) uW1[DRAW_SET_TEXT](M[KEY_RANDOM]() < 0.15 ? '6:00 AM' : '5:59 AM');
  if (modeT > 4 && (anyPr() || modeT > 8)) { if (night >= 5) goPaper(1); else goCall(night + 1); }
}
})();
