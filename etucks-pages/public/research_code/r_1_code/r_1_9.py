colnamesList, featTypeList = [], []
lineCount = 0; i=0
with open(dataAddress4, 'r') as dataFile:
    lines = dataFile.readlines()
    for line in lines:
        if line[0:10]=="@ATTRIBUTE":
            i+=1
            lineCount+=1
            colnames, featType = line.split(" ")[1:]
            colnamesList.append(colnames); featTypeList.append(featType)
        if line[0:4]=="@DATA":
            dataFile.close()
            break
print(lineCount)
data = pd.read_csv(dataAddress4, delimiter=",", skiprows=lineCount+10, names=colnamesList)
X = data.iloc[:,:-1]; y = data.iloc[:,-1]

XTrain, XTest, yTrain, yTest = train_test_split(X, y, test_size=0.2)
clfAB = AdaBoostClassifier()
clfAB.fit(XTrain, yTrain)
clfLR = LogisticRegression()
clfLR.fit(XTrain, yTrain)

yPredAB = clfAB.predict(XTest)
yPredLR = clfLR.predict(XTest)
yScoresAB = clfAB.predict_proba(XTest)
yScoresLR = clfLR.predict_proba(XTest)
precisionAB, recallAB, thresholdsAB = precision_recall_curve(yTest, yPredAB)
precisionLR, recallLR, thresholdsLR = precision_recall_curve(yTest, yPredLR)
fprAB, tprAB, thresholdsROCAB = roc_curve(yTest, yScoresAB[:,0])
rocAucAB = auc(fprAB,tprAB)
fprLR, tprLR, thresholdsROCLR = roc_curve(yTest, yScoresLR[:,0])
rocAucLR = auc(fprLR,tprLR)

yTestTP = np.shape(np.where(yTest==0))[1]
yTestTN = np.shape(np.where(yTest==1))[1]
allPPrecisionAB = precisionAB[0]; allPRecallAB = recallAB[0] #
allPPrecisionLR = precisionLR[0]; allPRecallLR = recallLR[0] #
allPFPRate = 1 #

fig, ax = plt.subplots(nrows=1,ncols=2, figsize=(10,5))
ABPlot = PrecisionRecallDisplay.from_estimator(
    clfAB, XTest, yTest, name="AdaBoost"   
).plot(ax=ax[0])
LRPlot = PrecisionRecallDisplay.from_estimator(
    clfLR, XTest, yTest, name="Logistic Regression"   
).plot(ax=ax[0])
ABPlot2 = RocCurveDisplay.from_estimator(clfAB, XTest, yTest, name="AdaBoost").plot(ax=ax[1])
LRPlot2 = RocCurveDisplay.from_estimator(clfLR, XTest, yTest, name="Logistic Regression").plot(ax=ax[1])
ax[0].plot(allPRecallAB, allPPrecisionAB, marker="o", markersize=10, color="red", label="All Positive Classifier")
ax[0].legend()
ax[1].plot(1,1, marker="o", markersize=10, color="red", label="All Positive Classifier")
ax[1].legend()
fig.tight_layout()
