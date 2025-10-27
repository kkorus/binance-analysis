import { Test, TestingModule } from '@nestjs/testing';
import { BinanceApiService, GetTradesResponse } from '../../binance-api';
import { TradesService } from './trades.service';
import { instance, mock, when, deepEqual } from '@johanblumenberg/ts-mockito';

describe('TradesService', () => {
  let sut: TradesService;
  let binanceApiService: BinanceApiService;
  let module: TestingModule;

  beforeEach(async () => {
    binanceApiService = mock(BinanceApiService);

    module = await Test.createTestingModule({
      providers: [
        TradesService,
        {
          provide: BinanceApiService,
          useValue: instance(binanceApiService),
        },
      ],
    }).compile();

    sut = module.get<TradesService>(TradesService);
  });

  it('service should be defined', () => {
    expect(sut).toBeDefined();
  });

  describe('getTrades', () => {
    it('should return trades data', async () => {
      // given
      const symbol = 'TEST_SYMBOL';
      const limit = 1;
      const tradesResponse: GetTradesResponse[] = [
        {
          id: 106103763,
          isBestMatch: true,
          isBuyerMaker: false,
          price: 0.000861,
          qty: 3.177,
          quoteQty: 0.00273539,
          time: 1761575115157,
        },
      ];
      when(
        binanceApiService.getTrades(
          deepEqual({
            symbol,
            limit,
          }),
        ),
      ).thenResolve(tradesResponse);

      // when
      const trades = await sut.getTrades(symbol, limit);

      // then
      expect(trades.length).toBe(1);
    });
  });
});
