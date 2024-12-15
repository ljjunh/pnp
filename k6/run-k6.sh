#!/bin/bash

# k6 디렉터리로 이동
workdir=$(dirname $0)
cd $workdir

# 만약, reports 디렉터리가 없다면 생성
if [ ! -d reports ]; then
  mkdir reports
fi

# 전체 시나리오 순차적 실행
for scenario in scenarios/**/*.ts; do
  echo "Running scenario: $scenario"
  k6 run \
    -e ENVIRONMENT=staging \
    --out json="reports/$(basename $scenario .ts)-report.json" \
    $scenario
done

# 결과 통합 및 요약
k6 report reports/*.json